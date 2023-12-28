from diffusers import StableDiffusionPipeline

class text2img:
    def __init__(self, model, custom_pipeline="latent_consistency_txt2img"):
        self.images = []

        self.pipe = StableDiffusionPipeline.from_pretrained(model, custom_pipeline=custom_pipeline, 
                                                    custom_revision="main", revision="fb9c5d", use_safetensors=True)

    def generate(self, prompt, num_inference_steps=10, guidance_scale=8.0, 
                 height=512, width=512, num_images_per_prompt=1):
        print("Generating...")
        # Can be set to 1~50 steps. LCM support fast inference even <= 4 steps. Recommend: 1~8 steps.
        output = self.pipe(prompt=prompt, num_inference_steps=num_inference_steps,
                                guidance_scale=guidance_scale, output_type="pil",
                                height=height, width=width,num_images_per_prompt=num_images_per_prompt)
        self.images = output.images

    def save_image(self, path, idx=0):
        self.images[idx].save(path)

    def show_image(self, idx=0):
        self.images[idx].show()

    def get_image(self,idx=0):
        return self.images[idx]


