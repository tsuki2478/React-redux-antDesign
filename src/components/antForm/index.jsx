import React, {PureComponent} from "react"
import {
	Row,
	Col,
	Form,
	Input,
	DatePicker,
	Select,
	Button,
	message,
	Popconfirm,
	Cascader,
	Upload,
	Icon, 
	Modal,
	InputNumber
} from "antd";
import moment from "moment"
import _ from "lodash"
import './index.less'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const { textarea } = Input;

message.config({
	duration: 3,
});
/**
 * 表单组件
 * @class antSearchForm
 * @extends {PureComponent}
 */
class antSearchForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			/* 图片 */
			UploadLoading: false,
			/* logo上传 */
			previewVisible: false,
			previewImage: '',
			fileList:[]
		}
		 /* 
		 如果是modal的话，请传
		      colSpan:{span: 24},
      span:{
        xs: { span: 24 },
        md: {span: 6},
			  xl: { span: 6 },
			  sm: { span: 6 },
      }, */
		this.formItemLayout = {
			labelCol: this.props.span || {
			  xs: { span: 24 },
			  sm: { span: 12 },
			  xl:{ span: 10}
			},
			wrapperCol: this.props.wrapper||{
			  xs: { span: 24 },
			  xl: { span: 12 },
			  sm: { span: 12 },
			},
		  };
		  this.colSpan = this.props.colSpan || {
			xs: { span: 24 },
			sm: { span: 12 },
			xl: { span: 6 },
		  }
	}
	handleGetArgs() {
		let args = Object.assign({}, this.props.form.getFieldsValue())
		if (this.state.times && this.state.times.length > 0) {
			this.state.times.forEach(node => {
				let formatType = "YYYY-MM-DD"
				_.forEach(this.props.options.items, (child) => {
					if (child.key === node) {
						formatType = child.format || "YYYY-MM-DD"
					}
				})
				if (_.isArray(args[node])) {
					args[node] = _.map(args[node], (leaf) => {
						// console.log(leaf)
						return leaf.format(formatType)
					})
				} else {
					args[node] = args[node] && args[node].format(formatType)
				}
			})
		}
		return args
	}
	/* call，查询执行 */
	handleCheck =()=> {
		this.withParam.call(this, this.props.handleCheck)
	}
	/* 模态框返回 */
	getValidatedArgs = (callback) => {
		this.withParam(callback)
	}
	/* 导出 */
	handleExport() {
		this.withParam.call(this, this.props.handleExport)
	}
	/* 格式处理，callback回去 */
	withParam(callback) {
		this.props.form.validateFields((errors, values) => {
			if (errors)
				return;
			let args = values;
			if (this.state.times && this.state.times.length > 0) {
				this.state.times.forEach(node => {
					let formatType = "YYYY-MM-DD"
					_.forEach(this.props.options.items, (child) => {
						if (child.key === node) {
							formatType = child.format || "YYYY-MM-DD"
						}
					})
					if (_.isArray(args[node])) {
						args[node] = _.map(args[node], (leaf) => {
							return leaf.format(formatType)
						})
					} else {
						args[node] = args[node] && args[node].format(formatType)
					}
				})
			}
			if (this.state.timeMin && this.state.timeMin.length > 0) {
					this.state.timeMin.forEach(node => {
					let formatType = "YYYY-MM-DD HH mm"
						_.forEach(this.props.options.items, (child) => {
							if (child.key === node) {
								formatType = child.format || "YYYY-MM-DD HH:mm"
							}
						})
						if (_.isArray(args[node])) {
							args[node] = _.map(args[node], (leaf) => {
								return leaf.format(formatType)
							})
						} else {
							args[node] = args[node] && args[node].format(formatType)
						}
					})
			}
			callback(args)
		})
	}
	/* 新增 */
	addHandle=()=> {
		this.props.addHandle("新增")
	}
	/* 清除 */
	handleClear=()=>{
		this.props.form.resetFields()
	}
    /* 图片格式 */
    beforeUpload(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'application/pdf' || file.type === 'image/png'|| file.type === 'image/bmp' || file.type === 'image/gif';
        if (!isJPG) {
          message.error('系统只支持[PNG/JPG/BMP/PDF]格式的文件上传!!');
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('上传的图片或文件必须小于2MB!');
          return false;
        }
        if (isJPG && isLt2M) {
          this.setState({
            UploadLoading: true
          });
        }
        return isJPG && isLt2M;
      }
      /* 图片上传 */
    handleChangeUpload(info){
    if (info.file.status === 'done') {
        this.setState({
        UploadLoading: false
        });
        console.log(info);
        let resp = info.file.response;
        if(resp.ret == 0){
        message.success(`${info.file.name} 上传成功！`);
        // this.setState({
        //     picture: resp.data.url
		// });
		this.props.form.setFieldsValue({
			PUpload:resp.data.url
		})
		this.props.UploadSuccess(this.props.form.PUpload)
        }else{
        message.error('文件上传失败，请检查文件类型或大小是否符合要求！');
        console.log('上传失败!');
        // this.setState({
        //     picture: ''
		// });
		this.props.form.setFieldsValue({
			PUpload:''
		})
        }
    } else if (info.file.status === 'error') {
        this.setState({
        UploadLoading: false
        });
        message.error(`${info.file.name} 上传失败！`);
    }
	}  
	
	/* logo上传取消 */
	handleCancel = () => this.setState({ previewVisible: false })
	handlePreview = (file) => {
	  this.setState({
		previewImage: file.url || file.thumbUrl,
		previewVisible: true,
	  });
	}
	/* logo上次 */  
	handleChange = ({ fileList }) => this.setState({ fileList })
	render() {
		/* 为logo准备 */
		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
		  <div>
			<Icon type="plus" />
			<div className="ant-upload-text">Upload</div>
		  </div>
		);
		const { getFieldDecorator } = this.props.form;
		const Values = this.props.form.getFieldsValue()
		this.state.times = []
		this.state.timeMin = []
		return (
			<Form horizontal={"true"} className={this.props.formClassName || `search-form EditForm`}>
				<Row gutter={40}>
					{this.props.options.items.map((node,index) => {
						if(this.props.Selected) { node.type === "Select" ? Values.Type = this.props.Selected : Values.Type }
							let returnNode
							switch(node.type){
								case "Input":
									returnNode = (<Input placeholder={node.placeholder} type={node.valueType} key={index} disabled={node.disabled} />)
								break;
								case "InputS":
									returnNode = (<Input placeholder={node.placeholder} type={node.valueType} autoComplete="on" key={index} disabled={node.disabled} />)
								break;
								case "InputNumber":
									returnNode = (<InputNumber min={1} max={10} placeholder={node.placeholder} key={index} disabled={node.disabled} />)
								break;
							case "Select":
							this.state.Selected = node.initialValue
									returnNode = (
										<Select
											allowClear={!!node.allowClear}
											showSearch={!!node.showSearch}
											placeholder={node.placeholder}
											disabled={node.disabled|| false}
											key="Select" >
											{
												_.isArray(node.options)?
												node.options.map(leaf => <Option key={leaf.value} value={leaf.value}>{leaf.name}</Option>)
												:null
											}
										</Select>
									)
								break;
								case "SelectS":
								returnNode = (
									<Select
										mode="multiple"
										>
										{
											_.isArray(node.options)?
											node.options.map(leaf => <Option key={leaf.value} value={leaf.value}>{leaf.name}</Option>)
											:null
										}
									</Select>
								)
								break;
								case "Cascader":
								returnNode = (
									<Cascader 
										options={node.options}  
										changeOnSelect 	
										placeholder={node.placeholder} 
										disabled={node.disabled|| false}
										fieldNames={node.fieldNames}
										allowClear={true}
										key="Cascader" />
								)
								break;
								case "RangePicker":
									this.state.times.push(node.key)
									returnNode = (
										<RangePicker
										showTime={node.showTime?node.showTime:false}
										format={node.format || "YYYY-MM-DD"}
										key="RangePicker"
														/>
									)
									break;
								case "RangePickerMin":
									this.state.timeMin.push(node.key)
									returnNode = (
										<RangePicker style={{width:"100%"}}
											showTime={{
												hideDisabledOptions: true,
												defaultValue: [moment("00:00", "HH:mm"), moment()],
												format: "HH:mm"
											}}
										format={ "YYYY-MM-DD HH:mm"}
														/>
									)
									break;
								case "DatePicker":
									this.state.times.push(node.key)
									returnNode = (
										<DatePicker
										showTime={!!node.showTime}
										format={node.format || "YYYY-MM-DD"}
										key={index} />
									)
									break;
								case "PUpload" :
									returnNode = (
										<Upload
											className="avatar-uploader"
											name="userfile"
											showUploadList={false}
											action="http://localhost:3000/api/web/merchant/upload"
											beforeUpload={this.beforeUpload.bind(this)}
											onChange={this.handleChangeUpload.bind(this)}
											>
											<div className="UploadList" style={{backgroundImage:(Values.PUpload?"url("+Values.PUpload+")":"none"),backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}}>
													{
														this.state.UploadLoading ? <img src="https://qfsys-img.oss-cn-hongkong.aliyuncs.com/hx/loading.gif" /> : "上传"
													}
											</div>
										</Upload> 
									)
									break;
									case "logo":
									returnNode = (
										<div className="clearfix">
										<Upload
										  action="//jsonplaceholder.typicode.com/posts/"
										  listType="picture-card"
										  fileList={fileList}
										  onPreview={this.handlePreview}
										  onChange={this.handleChange}
										>
										  {fileList.length >= 1 ? null : uploadButton}
										</Upload>
										<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
										  <img alt="example" style={{ width: '100%' }} src={previewImage} />
										</Modal>
									  </div>
									)
									break;
								case "TextArea" :
									returnNode = ( <textarea style={{width:'100%',height:150,lineHeight:1.5}} placeholder={node.placeholder} /> )
								 break;
								 case 'prize':
								 returnNode=(
									<Select
										allowClear={!!node.allowClear}
										showSearch={!!node.showSearch}
										placeholder={node.placeholder}
										disabled={node.disabled|| false}
										key="prize" >
										{
											_.isArray(node.options)?
											node.options.map(leaf => <Option key={leaf.value} value={leaf.value}>{leaf.name}</Option>)
											:null
										}
									</Select>									
								 )
								 break;
								default:
									returnNode = (<Input placeholder={node.placeholder} />)
							}
							return (
							<Col {...this.colSpan} key={node.key}>
								<FormItem {...this.formItemLayout} label={node.label} required>
											{
												node.type!=='prize' ?
												getFieldDecorator(node.key, {initialValue: node.initialValue,
													rules: [{validator: node.validator || ((rules, value, callback)=>callback()) }]})(returnNode)
												:null
											}
											{
												node.type==='prize'?
												(
													<div>
													{
														getFieldDecorator(node.key, {
														initialValue: node.initialNameValue,
														rules: [{validator: node.validator || null}]
														})(returnNode)
													}
													{
														getFieldDecorator(node.typekey, {
															initialValue: node.initialValue,
															rules: [{validator: node.validator}]
															})(<Input disabled />)
													}
													{
														getFieldDecorator(node.integralkey, {
															initialValue: node.initialValue,
															rules: [
																{required: true, message: '商户交易总额限额（元）'},
																{pattern:/^\d+(?:\.\d{1,2})?$/, message: '请输入正确的金额格式,最多保留两位小数点;' }
															  ]
															})( <Input type="number" />)
													}
														</div>
													):null
									       }
								</FormItem>
								</Col>
							)
						})
					}
				<Col span={24} key={"optionBtn"} style={Object.assign({}, {textAlign:'right', }, this.props.options.btnStyle)}>
					{
						_.isArray(this.props.options.btns)?
						this.props.options.btns.map(node => {
						if(node.hide) { return null }
							let commonStyle = {
								margin:'5px 10px 5px 10px'
							}
							let returnBtn
							switch(node.type){
								case "check":
									returnBtn = (
											<Button
												type="primary"
												style={commonStyle}
												loading={node.loading}
												onClick={ this.handleCheck }
												key="searchButton"
											>
												{node.name?node.name : '查询'}
											</Button>
											)
									break;
								case "export":
									returnBtn = (
											<Button
												type="primary"
												style={commonStyle}
												loading={node.loading}
												onClick={this.handleExport}
												key="exportButton"
											>
												导出
											</Button>
										)
									break;
								case "clear":
										returnBtn = (
											<Button
												style={commonStyle}
												onClick={this.handleClear}
												key="clearButton"
											>
												清空
											</Button>
										)
									break;
								case "新增":
										returnBtn = (
											<Button
												type="primary"
												style={commonStyle}
												onClick={this.addHandle}
												key="newAdd"
											>
											新增
										</Button>
								)
									break;
								default:
									returnBtn = (
										<Button
											type={node.btnType || "primary"}
											style={commonStyle}
											loading={node.loading}
											onClick={(...args) => {return node.fn(this.handleGetArgs(), ...args)}}
											key="default"
										>
											{node.name}
										</Button>
									)
							}
							return returnBtn
						}):null
					}
				</Col>
				<Col span={18} key={"optionBtnLeft"} style={Object.assign({}, { }, this.props.options.btnStyle)}>
				<div>
					<Col span={12} >
					{
						_.isArray(this.props.options.leftBtns)?
						this.props.options.leftBtns.map(node => {
							let returnBtn
							switch(node.type){
								default:
									returnBtn = (
										<Popconfirm placement="topRight" title={node.popTitle}
												onConfirm={(...args) => {return node.fn(this.handleGetArgs(), ...args)}}
												okText="确定" cancelText="取消">
												<Button
													type={node.btnType || "primary"}
													style={{margin:'5px 10px 5px 10px'}}
												>
													{node.name}
												</Button>
										</Popconfirm>
									)
							}
							return returnBtn
						}):null
					}
					</Col>
				</div>
				</Col>
				</Row>
			</Form>
			)
	}
}

export default Form.create({})(antSearchForm);
