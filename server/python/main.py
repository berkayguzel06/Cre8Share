# main.py

import sys
import os
from text2img import text2img

def generate_image(prompt, width, height):
    model = "SimianLuo/LCM_Dreamshaper_v7"
    t2i = text2img(model=model)
    t2i.generate(prompt=prompt, width=width, height=height, num_inference_steps=4)
    
    # Create the "images" directory if it doesn't exist
    if not os.path.exists("python\\images"):
        os.makedirs("python\\images")

    name = "generated_image.jpg"
    t2i.save_image(f"python/images/{name}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Received arguments:", sys.argv)
        print("Usage: python main.py <prompt> <width> <height>")
        sys.exit(1)
    prompt = sys.argv[1]
    width = int(sys.argv[2])
    height = int(sys.argv[3])

    generate_image(prompt, width, height)
