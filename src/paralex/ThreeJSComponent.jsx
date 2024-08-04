import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import "./style.css"

const ThreeJSComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;
    let scrollY = window.scrollY;
    let currentSection = 0;
    const sectionMeshes = [];

    const parameters = {
      materialColor: "#ec13e5",
      particleColor: "#ffeded"
    };

    const init = () => {
      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 6;

      const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
      directionalLight.position.set(1, 1, 0);
      scene.add(directionalLight);

      const textureLoader = new THREE.TextureLoader();
      const gradientTexture = textureLoader.load(
        "https://res.cloudinary.com/jasuaje/image/upload/v1700451779/f8722875071fb3f56277c4a03f7f1223.jpg"
      );
      gradientTexture.magFilter = THREE.NearestFilter;

      const material = new THREE.MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: gradientTexture
      });

      const objectsDistance = 4;
      for (let i = 0; i < 3; i++) {
        const geometry =
          i === 0
            ? new THREE.TorusGeometry(1, 0.4, 16, 60)
            : i === 1
            ? new THREE.ConeGeometry(1, 2, 32)
            : new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16);

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = i === 0 ? 2 : i === 1 ? -2 : 2;
        mesh.position.y = -objectsDistance * i;
        scene.add(mesh);
        sectionMeshes.push(mesh);
      }

      const particlesCount = 200;
      const positions = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] =
          objectsDistance * 0.5 -
          Math.random() * objectsDistance * sectionMeshes.length;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }

      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        color: parameters.particleColor,
        sizeAttenuation: true,
        size: 0.03
      });

      const particles = new THREE.Points(
        particlesGeometry,
        particlesMaterial
      );
      scene.add(particles);

      animate();
    };

    const animate = () => {
      const clock = new THREE.Clock();
      let previousTime = 0;

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        camera.position.y = (-scrollY / window.innerHeight) * 4;

        for (const mesh of sectionMeshes) {
          mesh.rotation.x += deltaTime * 0.1;
          mesh.rotation.y += deltaTime * 0.12;
        }

        renderer.render(scene, camera);

        window.requestAnimationFrame(tick);
      };

      tick();
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      const newSection = Math.round(scrollY / window.innerHeight);

      if (newSection !== currentSection) {
        currentSection = newSection;

        gsap.to(sectionMeshes[currentSection].rotation, {
          duration: 1.5,
          ease: "power2.inOut",
          x: "+=6",
          y: "+=3",
          z: "+=1.5"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    init();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl" />;
};

export default ThreeJSComponent;
