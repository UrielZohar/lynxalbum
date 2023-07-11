import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

export function PhotoAddModal({isVisible, handleAdd, handleCancel} : any) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible])

  const onFinish = (photo: any) => {
    handleAdd({...photo});
    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const _handleCancel = () => {
    handleCancel();
    setVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title='Add Photo'
      onCancel={_handleCancel}
      footer={[
        <Button key="add" type='primary' onClick={form.submit}>Add</Button>,
      ]}
      open={visible}
    >
      <Form
        name="addPhoto"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ 
          title: 'A new photo', 
          url: 'https://via.placeholder.com/600/92c952', 
          thumbnailUrl: 'https://via.placeholder.com/150/92c952' 
        }}
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
          <Form.Item
            label="url"
            name="url"
            rules={[{ required: true, message: 'Please input your url' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ThumbnailUrl"
            name="thumbnailUrl"
            rules={[{ required: true, message: 'Please input your thumbnailUrl' }]}
          >
            <Input />
          </Form.Item>
      </Form>
    </Modal>
  );
}