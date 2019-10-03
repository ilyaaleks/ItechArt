pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                bat 'npm install'
            }
        }
        stage('parallel') {
            parallel {
                // start several test jobs in parallel, and they all
                // will use Cypress Dashboard to load balance any found spec files
                stage('Run tests in parallel A') {
                    steps {
                        bat 'npx cypress run --record --key 0c726c22-3276-4cf9-a1e9-3cdc18936053 --parallel'
                    }
                }
                stage('Run tests in parallel B') {
                    steps {
                        bat 'npx cypress run --record --key 0c726c22-3276-4cf9-a1e9-3cdc18936053 --parallel'
                    }
                }
                stage('Run tests in parallel C') {
                    steps {
                        bat 'npx cypress run --record --key 0c726c22-3276-4cf9-a1e9-3cdc18936053 --parallel'
                    }
                }
            }
        }
    }
}
