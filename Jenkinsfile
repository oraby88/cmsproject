pipeline {
        agent {
        docker {
            //use node image as an agent to run npm commands
            image 'node:20'
        }
    }

    stages {
        
        stage('checkout') {
            steps {
                echo "Checkouting...."
                git 'https://github.com/spatiumsoftware/HR_Frontend-.git'      
                echo "End Checkouting"
                }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "Run npm install to install all Dependencies"
                sh 'npm install'
                echo " Finish install Dependencies"
            }
        }   
        stage('Building') {
            steps {
                echo "Start Building stage"
                sh 'npm run build --prod'
                echo "Finish Building stage"

            }
        }
        
        stage("Build Docker Image"){
            steps{
                echo "Building an image from the app"
                sh 'docker build -t mmohei24/hr-app-frontend:$BUILD_NUMBER .'
            }
        }
        
        stage('Login To Dockerhub'){
            steps{
                withCredentials([usernamePassword(credentialsId:'dockerhub-credintial', usernameVariable:'USERNAME', passwordVariable: 'PASSWORD')]){
                sh'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                }
            }
        }
        
        stage("Push Docker Image"){
            steps{
                echo "Start pushing the image to dockerhub"
                sh 'docker push mmohei24/hr-app-frontend:$BUILD_NUMBER'
                echo "The image pushed successully"
            }
        }
        
        stage('Delete Local Image') {
            steps {
                sh 'docker rmi mmohei24/hr-app-frontend:$BUILD_NUMBER'
                echo "image deleted from the local"
            }
        }
    }
    post{
        always{
            sh 'docker logout'
        }
    }
    
}