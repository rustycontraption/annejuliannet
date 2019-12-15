const resolve = require('path').resolve;
const config = {
	devtool: false,
	entry:  __dirname + '/static/index.tsx',
	output:{
        	path: __dirname + '/static/public/',
        	filename: 'bundle.js',
 	},
 	resolve: {
        	extensions: ['.js','.jsx','.css','.tsx']
 	},
 	module: {
        	rules: [
		{
                	test: /\.(js|jsx|tsx)$/,
                	exclude: /node_modules/,
                use: {
                	loader: 'babel-loader',
                        options: {
                                presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
				"@babel/preset-typescript"
                                ],
				plugins: [
				"@babel/plugin-proposal-class-properties"
				]
                        }
                }
        	},      
        	{
                	test: /\.css$/,
                	use: {
				loader: 'css-loader',
			}
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
        ]}
};

module.exports = config;

