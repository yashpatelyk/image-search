# Prerequisite

- `node 12.x`
- `npm 6.x`
- `@angular/cli 9+`
- `~/.aws/credentials` file should have at least 1 aws profile

# Setup

1) Go to `image-upload-aws/server/src/config`
2) Change the config as per your AWS account
    - You will need give the name of your AWS profile
    - Name of s3 bucket to store images
    - And elasticsearch details
    
## Migration

If you have uploaded images in the first step of solution to
AWS RDS instance, you will need to migrate those images
to elastics search server. For migration execute below

- `sh migrate_to_elastic.sh`

# Steps to start the solution

- Execute command `sh start.sh`
