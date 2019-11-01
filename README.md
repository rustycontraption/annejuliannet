annejulian.net is built with Flask and served with AWS Lambda and S3 via Cloudfront.  I use Zappa to deploy the Flask app to Lambda.     

The structure (roughly):
```
Static assets in S3 bucket
        |
        |__Cloudfront distribution
           (static.annejulian.net)
                    |
                    |__Route 53 A record 
                    |
                    |__static.annejulian.net certificate

Flask Lambda function
        |
        |__API Gateway
                    |
                    |__Cloudfront distribution
                       (annejulian.net)
                                |
                                |__Route 53 A record
                                |
                                |__ annejulian.net certificate
```

Notes: 
* The S3 Cloudfront distribution and associated Route 53 record are created manually and the API Gateway Cloudfront Distribution and associated Route 53 record are created automatically with ``` zappa certify```
* All certs must be in us-east-1 

zappa_settings.json:

```{
    "dev": {
        "app_function": "app.app",
        "aws_region": "us-west-2",
        "profile_name": "default",
        "project_name": "annejuliannet",
        "runtime": "python3.6",
        "s3_bucket": "annejulian.net"
    },
    "production": {
        "app_function": "app.app",
        "aws_region": "us-west-2",
        "profile_name": "default",
        "project_name": "annejuliannet",
        "runtime": "python3.6",
        "s3_bucket": "annejulian.net",
        "route_53":"false",
        "endpoint_configuration": ["REGIONAL"],
        "certificate_arn":"<REDACTED>,
        "domain":"annejulian.net"
    }
}
```
