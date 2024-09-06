# E Commerce App
## Builded with Spring Boot and React.js
### Environment Setup
- Node.js 20 [click here for download](https://nodejs.org/en/download/package-manager)
- Java Development Kit 17 (JDK 17) [click here for download](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (I strongly recommend MSI Installers if you use Windows)
- Any code editor which I recommend  [vscode](https://code.visualstudio.com/download) for frontend, [intelij idea](https://www.jetbrains.com/idea/)
 for backend 

### Control Environment Is Ready or Not
- for nodejs, just type `node -v` to cmd or shell
- for jdk, just type `java -version` to cmd or shell
- if everything is fine, lets start with downloading repo.
[click here for download](https://github.com/emirhankarakoc/e-commerce/archive/refs/heads/main.zip)

### After downloading, unzip the repo and open it. 
As you see, there is two folders. One of them is backend called `backend-springboot` other one is frontend called `frontend-reactjs` (simple)
<br> Choose a folder and open it then `right click menu - open with VSCode/Intellij Idea`.

### If you chosen backend we are one more step far from starting the server
#### Database Setup
- Mysql 8 [download link](https://dev.mysql.com/downloads/installer/)
- Mysql Workbench (or another db connector) [download link](https://dev.mysql.com/downloads/workbench/)
#
Install mysql, install workbench and change my username and password with yours in `src > main > resources > applcation.properties` file
## Server installation finished.
![image](https://github.com/user-attachments/assets/e13cb511-f42a-4b4f-9752-855ae691d136)<br>
As you see, server just started.
<br> 
### Server Port
If you dont change from `application.properties`, port will be :8080 (if there is empty)


## Frontend start
- we dont need another application here like mysql, we have node.js and this will enough for now.

### Open the `frontend-reactjs` folder and `right click - open with VSCode`
After opened, just open the terminal with 
- ctrl + shift + \` (last character below the esc button)

### Starting with install required folders, open terminal and type

- npm install
- npm run dev

this will be enough for environment setup. thanks for joining me.
