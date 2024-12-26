import { useAuthStore } from "@/features/authentication/stores/auth.store";
import { IUser } from "@/features/authentication/types/user.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import React, { memo, useEffect } from "react";
import toast from "react-hot-toast";

const UpdateMeForm = () => {
  const [form] = useForm<IUser>();
  const onFinish: FormProps<IUser>["onFinish"] = (values) => {
    updateMeResult.mutate(values);
  };
  const onFinishFailed: FormProps<IUser>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { updateMe, getMe, user } = useAuthStore();

  // update form before changes
  const getMeResult = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      const response = await getMe();
      return response.data;
    },
  });
  useEffect(() => {
    if (getMeResult.isSuccess) {
      form.setFieldsValue(user as IUser);
    }
  }, [user, form, getMeResult]);

  const updateMeResult = useMutation({
    mutationFn: async (values: IUser) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value as string)
      );

      const response = await updateMe(formData);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <>
      {(getMeResult.isLoading || updateMeResult.isPending) && (
        <div>Loading...</div>
      )}
      <div className="shadow rounded p-4">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<IUser>
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser> label="Nickname" name={"nickname"}>
            <Input />
          </Form.Item>
          <Form.Item<IUser> label="Phone number" name={"phone_number"}>
            <Input />
          </Form.Item>
          <Form.Item<IUser> label="Address" name={"address"}>
            <Input />
          </Form.Item>
          <Form.Item<IUser> label="Email address" name={"email_address"}>
            <Input />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button htmlType="submit" type="primary">
              Update Me
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default memo(UpdateMeForm);
