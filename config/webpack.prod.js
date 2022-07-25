 const path = require("path"); //node.js核心模块，专门用来处理路径问题
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
 
 module.exports  = {
	 //入口
	 entry:'./src/main.js', //相对路径
	 //输出
	 output: {
		 //____dirname当前文件夹的路径
		 path:path.resolve(__dirname, '../dist'), //文件的输出路径 -> 绝对路径
		 filename:'static/js/main.js', //文件的输出名称
		 clean: true //自动清除上次打包记录
	 },
	 //加载器
	 module: {
		 rules: [
			 //loader的配置
			 {
				test:/\.css$/,
				use:[
					MiniCssExtractPlugin.loader, //提取css成单独的文件
					//style-loader将js中css通过创建style标签添加html文件中样式生效
					"css-loader", //讲css资源编译成commonjs的模块到js中
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									"postcss-preset-env" //能解决大多数样式兼容性问题
								]
							}
						}
					}
				] //执行顺序从右到左 
			 },
			 {
				test:/\.less$/,
				use:[
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									"postcss-preset-env" //能解决大多数样式兼容性问题
								]
							}
						}
					},
					"less-loader" //将less编译成css
				]
			 },
			 {
			 	test: /\.(png|jpe?g|gif|webp|svg)$/,
				type:"asset",
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024, //小于10kb的图片转base64
					}
				},
				generator:{
					// 输出图片名称
					filename:'static/images/[hash:10][ext][query]'
				}
			 },
			 {
			 	test: /\.(ttf|woff2?|mp3|mp4|avi|rmvb)$/,
			 	type:"asset/resource",
			 	generator:{
			 		// 输出名称
			 		filename:'static/media/[hash:10][ext][query]'
			 	}
			 },
			 { //解决js兼容性问题
				 test: /\.js$/,
				 exclude: '/node_modules/' ,//排除node_modules中的js文件
				 loader: "babel-loader"
			 }
		 ]
	 },
	 //插件
	 plugins: [
		 new HtmlWebpackPlugin({
			 //模版，以public/index.html为模版创建新的文件
			 //结构和原来一致，可以自动引入打包的资源
			 template: path.resolve(__dirname, "../public/index.html")
		 }),
		 new MiniCssExtractPlugin({
			 filename: "static/css/main.css"
		 }),
		 new CssMinimizerPlugin()
	 ],
	 //模式
	 mode: 'production'
 }