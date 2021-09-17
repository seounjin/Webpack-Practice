
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development', // 현재 모드를 개발 환경으로 설정
    entry: './src/index.js', // 애플리케이션 진입점
    output: { // 번들된 파일을 저장할 경로
      filename: 'bundle.[hash].js' 
    },

    module: {
        rules: [
          { // es6 바벨 관련 loader ,  .js 와 함께 .jsx 확장자도 번들함. node_modules 안에 있는 파일은 번들에서 제외
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },

          { // 웹팩이 html을 읽을 수 있게 해줌, minimize: true 는 코드 최적화를 하는 옵션
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          },

          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },

        ],
      },

    plugins: [ 
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // 템플릿을 지정하거나 favicon을 설정할 수 있음
      template: 'public/index.html', // public/index.html 를 템플릿으로 지정
      })
    ],

    devServer: {  // 개발서버
        host: 'localhost',
        port: port,
        open: true, // 서버가 실행될 때 브라우저를 자동으로 열어줄지 결정
    },

};