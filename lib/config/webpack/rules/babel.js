module.exports =  {
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['< 1%']
                        }
                    }],
                    "@babel/preset-react"
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    ['import', {
                        libraryName: 'antd',
                        style: true
                    }]
                ]
            }
        }],
    exclude: /node_modules/
}