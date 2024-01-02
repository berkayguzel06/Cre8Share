// Child process allows us to run Python script in the background. Without blocking the Node.js event loop.
const { spawn } = require('child_process'); 
const path = require('path');

async function generateImageInBackground(prompt, width, height) {
    return new Promise((resolve, reject) => {
      // Run the Python script in the virtual environment
      console.log('Start image generation.');
      const activationCommand = 'python\\venv\\Scripts\\activate && python python\\main.py';
      // Run commands in the terminal to generate the image. With the prompt, width, and height as arguments
      // Spawn a child process to run the commands
      const pythonProcess = spawn(activationCommand, [`"${prompt}"`, `${width}`, `${height}`], {
        shell: true,
        stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
      });
  
      let stdoutData = '';
      let stderrData = '';
  
      // Collect data from script stdout and stderr streams
      pythonProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });
  
      pythonProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
      });
  
      pythonProcess.on('error', (error) => {
        console.error(`Error in Python process: ${error.message}`);
        reject(error);
      });
  
      pythonProcess.on('exit', (code) => {
        if (code === 0) {
          console.log('Image generation completed successfully.');
          // Resolve with the path to the generated image
          const imagePath = path.join(__dirname, '..', 'python', 'images', 'generated_image.jpg');
          console.log(`Image path: ${imagePath}`);
          resolve(imagePath);
        } else {
          console.error(`Image generation failed with code ${code}`);
          console.error(`Python script stderr: ${stderrData}`);
          reject(new Error(`Image generation failed with code ${code}`));
        }
      });
    });
  }


async function performSetup() {
    return new Promise((resolve, reject) => {
      // Set the path to your virtual environment in project folder
      const venvPath = 'python\\venv';
      console.error(`Creating virtual environment at ${venvPath}`);
      
      // Check if the virtual environment exists. If not create it
      const venvExistsCommand = `if not exist "${venvPath}" (python -m venv ${venvPath})`;
      const createVenvProcess = spawn(venvExistsCommand, { shell: true });
  
      createVenvProcess.on('exit', (code) => {
        if (code === 0) {
          console.log('Virtual environment created successfully.');
          const requirementPath = 'python\\requirements.txt';
          // Use the virtual environment to install dependencies with using requirements.txt
          const installDependenciesCommand = `${venvPath}\\Scripts\\activate && pip install -r ${requirementPath}`;
          console.error(`Installing dependencies using command: ${installDependenciesCommand}`);
          const installDependenciesProcess = spawn(installDependenciesCommand, { shell: true });
  
          installDependenciesProcess.on('exit', (installCode) => {
            if (installCode === 0) {
              console.log('Dependencies installed successfully.');
              resolve();
            } else {
              console.error(`Failed to install dependencies. Exit code: ${installCode}`);
              reject(new Error(`Failed to install dependencies. Exit code: ${installCode}`));
            }
          });
        } else {
          console.error(`Failed to create virtual environment. Exit code: ${code}`);
          reject(new Error(`Failed to create virtual environment. Exit code: ${code}`));
        }
      });
    });
  }

// Exporting both functions
module.exports = {
    generateImageInBackground,
    performSetup,
  };