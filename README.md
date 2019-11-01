annejulian.net is built with Flask and served with AWS Lambda and S3 via Cloudfront.  I use Zappa to deploy the Flask app to Lambda.     

The structure:
```
Static assets in S3 bucket
    |
    |> Cloudfront distribution
       (static.annejulian.net)
            |
            |> Route 53 A record

Flask Lambda function
    |
    |> API Gateway
            |
            |> Cloudfront distribution
               (annejulian.net)
                    |
                    |> Route 53 A record
```
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
