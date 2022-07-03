[![build-test](https://github.com/d-fournier/delete-workflow-artifacts/actions/workflows/test.yml/badge.svg)](https://github.com/d-fournier/delete-workflow-artifacts/actions/workflows/test.yml)

# Delete workflow artifacts
This action allows you to delete old artifacts from a given workflow for a branch.
This actions is created in typescript, allowing it to be used on a various range of runners

## Inputs

| name          | required | type   | default         | description |
| ------------- | ---      | ------ | --------------- | ----------- |
| github-token  | yes      | string |                 | Token to interact with the current repository. This token is usually already in the environment variables ${{ secrets.GITHUB_TOKEN }}.
| workflow-id   | yes      | string |                 | Name of the file containing the workflow |
| branch-name   | no       | string |                 | Name of the branch, default (github.head_ref) which works correctly for PR or push events |

