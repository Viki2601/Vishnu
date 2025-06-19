'use client';

import * as THREE from 'three';
import { useRef, useEffect } from 'react';

export default function Globe() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // transparent background
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0); // transparent
        mount.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0077be });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute top-60 left-36 w-full h-[400px] bg-transparent overflow-hidden z-0">
    </div>;
}