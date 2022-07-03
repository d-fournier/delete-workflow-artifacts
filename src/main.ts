import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const token: string = core.getInput('github-token')
  const workflowId: string = core.getInput('workflow-id')
  const api = github.getOctokit(token)

  const owner = github.context.repo.owner
  const repo = github.context.repo.repo
  const branch = github.context.ref

  core.info(
    `Listing all workflow runs based on ${workflowId} for ${owner}/${repo} on branch ${branch}, `
  )

  const runs = await api.rest.actions.listWorkflowRuns({
    owner,
    repo,
    workflow_id: workflowId,
    branch
  })

  core.info(`Found ${runs.data.total_count} runs`)

  let deletedArtifact = 0

  for (const workflowRun of runs.data.workflow_runs) {
    const artifacts = await api.rest.actions.listWorkflowRunArtifacts({
      owner,
      repo,
      run_id: workflowRun.id
    })
    for (const artifact of artifacts.data.artifacts) {
      await api.rest.actions.deleteArtifact({
        owner,
        repo,
        artifact_id: artifact.id
      })
      deletedArtifact++
    }
  }
  core.info(`Deleted ${deletedArtifact} artifact`)
}

run()
