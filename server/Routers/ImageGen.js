// router.js
const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();
const path = require('path');
// Variable to track whether setup has been performed
let isSetupCompleted = false;

router.post('/generateImage', async (req, res) => {
  try {
    const { prompt, width, height } = req.body;

    // Perform setup only on the first run
    if (!isSetupCompleted) {
      await performSetup();
      isSetupCompleted = true;
    }

    // Generate image in the background
    const imagePath = await generateImageInBackground(prompt, width, height);

    // Respond to the client with the generated image path
    res.status(200).send({ imagePath });
  } catch (error) {
    console.error(`Error in image generation: ${error.message}`);
    res.status(500).send({ error: 'Image generation failed' });
  }
});


async function performSetup() {
  return new Promise((resolve, reject) => {
    // Set the path to your virtual environment
    const venvPath = 'python\\venv';
    console.error(`Creating virtual environment at ${venvPath}`);
    
    // Check if the virtual environment exists
    const venvExistsCommand = `if not exist "${venvPath}" (python -m venv ${venvPath})`;
    const createVenvProcess = spawn(venvExistsCommand, { shell: true });

    createVenvProcess.on('exit', (code) => {
      if (code === 0) {
        console.log('Virtual environment created successfully.');
        const requirementPath = 'python\\requirements.txt';
        // Use the virtual environment's Python executable to install dependencies
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



async function generateImageInBackground(prompt, width, height) {
  return new Promise((resolve, reject) => {
    // Run the Python script in the virtual environment
    console.log('Start image generation.');
    const activationCommand = 'python\\venv\\Scripts\\activate && python python\\main.py';
    const pythonProcess = spawn(activationCommand, [`"${prompt}"`, `${width}`, `${height}`], {
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
    });

    let stdoutData = '';
    let stderrData = '';

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

module.exports = router;
