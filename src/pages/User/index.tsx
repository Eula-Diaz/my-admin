import {
  Alert,
  Button,
  Space,
  Table,
  Popconfirm,
  Input,
  Modal,
  Form,
  InputNumber,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getUsers, deleteUser, createUser, updateUser } from "../../api/user";
import type { User } from "../../types/user";
import type { CurrentUser } from "../../types/auth";
import { hasPermission } from "../../types/auth";

function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const userString = localStorage.getItem("user");
  const currentUser: CurrentUser | null = userString
    ? JSON.parse(userString)
    : null;

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
        messageApi.success(`用户 ${id} 删除成功`);
        loadUsers(); // 删除后重新加载用户数据
      })
      .catch((err) => {
        console.log(`删除用户 ${id} 失败:`, err);
        setError(true);
        messageApi.error(`删除用户 ${id} 失败: ${err}`);
      });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      age: user.age,
    });
    setOpen(true);
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
        <>
          {currentUser && hasPermission(currentUser.role, "user:edit") && (
            <Button type="link" onClick={() => handleEdit(record)}>
              编辑
            </Button>
          )}
          {currentUser && hasPermission(currentUser.role, "user:delete") && (
            <Popconfirm
              title="确定要删除这个用户吗？"
              onConfirm={() => {
                handleDeleteUser(record.id);
              }}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (values: { name: string; age: number }) => {
    setSubmitLoading(true);
    try {
      if (editingUser) {
        await updateUser(editingUser.id, values);
      } else {
        await createUser(values);
      }
      messageApi.success(editingUser ? "更新用户成功" : "创建用户成功");
      setOpen(false);
      await loadUsers();
      form.resetFields();
    } catch (error) {
      console.error(error);
      messageApi.error("操作失败,请稍后重试");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
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
        {currentUser && hasPermission(currentUser.role, "user:add") && (
          <Button
            type="primary"
            onClick={() => {
              setEditingUser(null);
              form.resetFields();
              setOpen(true);
            }}
          >
            新增用户
          </Button>
        )}
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

      <Modal
        title={editingUser ? "编辑用户" : "新增用户"}
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setEditingUser(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <InputNumber min={1} max={150} style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={submitLoading}>
            {editingUser ? "保存" : "创建"}
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default User;
