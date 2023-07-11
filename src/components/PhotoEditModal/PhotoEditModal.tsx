import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

export function PhotoEditModal({isVisible, handleCancel, id, title, handleUpdate, ...rest} : any) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    form.setFieldsValue({title});
  }, [id, title]);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible])


  const onFinish = ({title}: any) => {
    handleUpdate({...rest, title, id});
    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const _handleCancel = () => {
    setVisible(false);
    form.resetFields();
    handleCancel();
  };

  return (
    <Modal
      title={`Album ID ${id}`}
      onCancel={_handleCancel}
      footer={[
        <Button key="update" type='primary' onClick={form.submit}>Update</Button>,
      ]}
      open={visible}
    >
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ title }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title' }]}
          >
            <Input />
          </Form.Item>
      </Form>
    </Modal>
  );
}