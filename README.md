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
