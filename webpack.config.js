const resolve = require('path').resolve;
const config = {
	devtool: '',
	entry:  __dirname + '/static/index.tsx',
	output:{
        	path: __dirname + '/static/public/',
        	filename: '[name].bundle.js',
 	},
 	resolve: {
        	extensions: ['.js','.jsx','.css','.tsx','scss','less'],
		modules:['node_modules'],
 	},
	module: {
        	rules: [
		{
                	test: /\.(js|jsx|tsx)$/,
                	exclude: /node_modules/,
                	loader: 'babel-loader',
                        options: {
                               	presets: [
                               		"@babel/preset-env",
                              		"@babel/preset-react",
					"@babel/preset-typescript"
                                	],
				plugins: [
					"@babel/plugin-proposal-class-properties",
				]
                        },
                
		},
		{
		
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'style-loader'
				},
				{ 
					loader: 'css-loader'
				}
			]
		},
		{
                	test: /\.less$/,
                    	use: [
				{
					loader: 'style-loader'
				},
				{	loader: 'less-loader',
					options: {
						javascriptEnabled: true,
					}
				},
				{
					loader: 'css-loader'
				}
			]
		},
		{		
			test: /\.(jpg|png|svg)$/,
    			use: [{
        			loader: 'file-loader',
        			options: {
					outputPath: 'images/',
					publicPath: '/static/public/images',
        			},
      			}]
		},
        ]},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			},
			name: false
		}
	}
};

module.exports = config;

