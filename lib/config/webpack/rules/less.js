module.exports =  {
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    ]
}