import { Alert, Button, Space, Table, Popconfirm, Input } from "antd";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/user";
import type { User } from "../../types/user";

function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const loadUsers = (
    currentPage: number = page,
    currentPageSize: number = pageSize,
    currentKeyword: string = keyword,
  ) => {
    setLoading(true);
    setError(false);
    getUsers({
      page: currentPage,
      pageSize: currentPageSize,
      keyword: currentKeyword,
    })
      .then((res) => {
        console.log("用户数据:", res.data);
        setUsers(res.data.list);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log("获取用户数据失败:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteUser = (id: number) => {
    deleteUser(id)
      .then(() => {
        console.log(`用户 ${id} 删除成功`);
        loadUsers(); // 删除后重新加载用户数据
      })
      .catch((err) => {
        console.log(`删除用户 ${id} 失败:`, err);
        setError(true);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "action",
      render: (_: unknown, record: User) => (
        <Popconfirm
          title="确定要删除这个用户吗？"
          onConfirm={() => {
            handleDeleteUser(record.id);
          }}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      {error && (
        <Alert
          title="获取用户数据失败"
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="请输入用户名"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          onClick={() => {
            setPage(1);
            setKeyword(searchInput);
            loadUsers(1, pageSize, searchInput);
          }}
        >
          搜索
        </Button>
        <Button
          onClick={() => {
            setSearchInput("");
            setKeyword("");
            setPage(1);
            loadUsers(1, pageSize, "");
          }}
        >
          刷新
        </Button>
      </Space>
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize);
            loadUsers(newPage, newPageSize, keyword);
          },
        }}
      />
    </>
  );
}

export default User;
