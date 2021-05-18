import { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useStyles } from '../static/signPages.style';
import { Upload, message, Radio, Form } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function StudentAuthContainer() {
    const classes = useStyles();
    const [state, setState] = useState({
        loading: false,
    });
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl) =>
                setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    const handleSubmit = ({ cardType, cardImage }) => {
        if (!cardType) return message.error('학생증 유형을 선택하세요.');
        if (!cardImage) return message.error('학생증 사진을 업로드하세요.');
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    return (
        <>
            <p className={classes.loginTitle}>
                <span className={classes.loginTitleGreen}>학생증 인증</span>이 필요해요.
            </p>
            <Grid className={classes.authFormWrapper} container justify="center" spacing={2}>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Grid item xs={12} align="center">
                        <Form.Item
                            name="cardImage"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            noStyle
                        >
                            <Upload
                                name="cardImage"
                                listType="picture-card"
                                className={classes.uploader}
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {state.imageUrl ? (
                                    <img
                                        src={state.imageUrl}
                                        alt="학생증 사진"
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                    <UploadButton
                                        loading={state.loading}
                                        imageurl={state.imageUrl}
                                    />
                                )}
                            </Upload>
                        </Form.Item>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <p className={classes.authInfoSmall}>
                            학생증 사진은 단국대학교 학생임을 증명하고,
                            <br />
                            회원 정보에 저장하는 절차에만 사용됩니다.
                        </p>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                            fullWidth
                            type="submit"
                            size="large"
                            variant="outlined"
                            color="primary"
                        >
                            인증하기
                        </Button>
                    </Grid>
                </Form>
                <Grid item xs={12} align="center" className={classes.backLinkWrapper}>
                    <Link to="/" className={classes.backLink}>
                        돌아가기
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}

function UploadButton({ loading, imageUrl }) {
    return (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>학생증 사진 업로드</div>
        </div>
    );
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('JPG/PNG 파일만 업로드할 수 있습니다.');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('2MB 크기 이하의 사진만 업로드할 수 있습니다.');
    }
    return isJpgOrPng && isLt2M;
}
