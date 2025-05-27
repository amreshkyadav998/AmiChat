// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import AuthImagePattern from "../components/AuthImagePattern";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { login, isLoggingIn } = useAuthStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     login(formData);
//   };

//   return (
//     <div className="h-screen grid lg:grid-cols-2 mt-8">
//       {/* Left Side - Form */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
//               transition-colors"
//               >
//                 <MessageSquare className="w-6 h-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
//               <p className="text-base-content/60">Sign in to your account</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Don&apos;t have an account?{" "}
//               <Link to="/signup" className="link link-primary">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image/Pattern */}
//       <AuthImagePattern
//         title={"Welcome back!"}
//         subtitle={"Sign in to continue your conversations and catch up with your messages."}
//       />
//     </div>
//   );
// };
// export default LoginPage;

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Now uncommented
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import * as THREE from 'three';
import { useAuthStore } from "../store/useAuthStore"; // Now uncommented

// EnhancedAuthPattern component remains unchanged
const EnhancedAuthPattern = ({ title, subtitle }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particleSystemRef = useRef(null);
  const waveMeshRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('dark');

  const themeColors = {
    dark: {
      primary: 0x00ff88,
      secondary: 0x00c8ff,
      accent: 0x9333ea,
      background: 0x000000,
      particleColor: 0x00ff88,
      waveColor: 0x00c8ff
    },
    light: {
      primary: 0x059669,
      secondary: 0x0284c7,
      accent: 0x7c3aed,
      background: 0xffffff,
      particleColor: 0x059669,
      waveColor: 0x0284c7
    },
    cyberpunk: {
      primary: 0xff0080,
      secondary: 0x00ffff,
      accent: 0xffff00,
      background: 0x0a0a0a,
      particleColor: 0xff0080,
      waveColor: 0x00ffff
    }
  };

  useEffect(() => {
    const detectTheme = () => {
      const htmlElement = document.documentElement;
      if (htmlElement.classList.contains('cyberpunk')) {
        setCurrentTheme('cyberpunk');
      } else if (htmlElement.classList.contains('light')) {
        setCurrentTheme('light');
      } else {
        setCurrentTheme('dark');
      }
    };

    detectTheme();
    
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    
    const updateSize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    updateSize();
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const createParticleSystem = () => {
      const particleCount = 150;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];
      const colors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 25;
        positions[i3 + 1] = (Math.random() - 0.5) * 25;
        positions[i3 + 2] = (Math.random() - 0.5) * 15;
        
        velocities.push({
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.01
        });

        const color = new THREE.Color(themeColors[currentTheme].particleColor);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        vertexColors: true
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      particleSystemRef.current = { mesh: particleSystem, velocities };
      return particleSystem;
    };

    const createWaveGeometry = () => {
      const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
      const material = new THREE.MeshBasicMaterial({
        color: themeColors[currentTheme].waveColor,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
        blending: THREE.AdditiveBlending
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 4;
      mesh.position.z = -8;
      waveMeshRef.current = mesh;
      return mesh;
    };

    const createConnectionLines = () => {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = [];
      
      for (let i = 0; i < 80; i++) {
        linePositions.push(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12
        );
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: themeColors[currentTheme].secondary,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });
      
      return new THREE.LineSegments(lineGeometry, lineMaterial);
    };

    const createGeometricShapes = () => {
      const group = new THREE.Group();
      
      const torusGeometry = new THREE.TorusGeometry(2, 0.5, 8, 16);
      const torusMaterial = new THREE.MeshBasicMaterial({
        color: themeColors[currentTheme].accent,
        transparent: true,
        opacity: 0.4,
        wireframe: true
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.set(-5, 3, -3);
      group.add(torus);
      
      const octaGeometry = new THREE.OctahedronGeometry(1.5);
      const octaMaterial = new THREE.MeshBasicMaterial({
        color: themeColors[currentTheme].primary,
        transparent: true,
        opacity: 0.5,
        wireframe: true
      });
      const octa = new THREE.Mesh(octaGeometry, octaMaterial);
      octa.position.set(4, -2, -2);
      group.add(octa);
      
      return group;
    };

    const particleSystem = createParticleSystem();
    const waveGeometry = createWaveGeometry();
    const connectionLines = createConnectionLines();
    const geometricShapes = createGeometricShapes();
    
    scene.add(particleSystem);
    scene.add(waveGeometry);
    scene.add(connectionLines);
    scene.add(geometricShapes);

    camera.position.z = 8;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      if (particleSystemRef.current) {
        const { mesh, velocities } = particleSystemRef.current;
        const positions = mesh.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const velocityIndex = i / 3;
          positions[i] += velocities[velocityIndex].x;
          positions[i + 1] += velocities[velocityIndex].y;
          positions[i + 2] += velocities[velocityIndex].z;
          
          if (Math.abs(positions[i]) > 12) velocities[velocityIndex].x *= -1;
          if (Math.abs(positions[i + 1]) > 12) velocities[velocityIndex].y *= -1;
          if (Math.abs(positions[i + 2]) > 7) velocities[velocityIndex].z *= -1;
        }
        
        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.rotation.y += 0.002;
      }
      
      if (waveMeshRef.current) {
        const positions = waveMeshRef.current.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          positions[i + 2] = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time) * 2;
        }
        waveMeshRef.current.geometry.attributes.position.needsUpdate = true;
        waveMeshRef.current.rotation.z += 0.005;
      }
      
      geometricShapes.children.forEach((child, index) => {
        child.rotation.x += 0.01 * (index + 1);
        child.rotation.y += 0.015 * (index + 1);
      });
      
      connectionLines.rotation.x += 0.003;
      connectionLines.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => updateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (e) {
          // Element might already be removed
        }
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    const colors = themeColors[currentTheme];
    
    if (particleSystemRef.current) {
      const colorAttribute = particleSystemRef.current.mesh.geometry.attributes.color.array;
      const color = new THREE.Color(colors.particleColor);
      
      for (let i = 0; i < colorAttribute.length; i += 3) {
        colorAttribute[i] = color.r;
        colorAttribute[i + 1] = color.g;
        colorAttribute[i + 2] = color.b;
      }
      
      particleSystemRef.current.mesh.geometry.attributes.color.needsUpdate = true;
    }
    
    if (waveMeshRef.current) {
      waveMeshRef.current.material.color.setHex(colors.waveColor);
    }
    
    sceneRef.current.traverse((child) => {
      if (child.material) {
        if (child.material.type === 'LineBasicMaterial') {
          child.material.color.setHex(colors.secondary);
        }
      }
    });
  }, [currentTheme]);

  return (
    <div className="hidden lg:flex items-center justify-center relative overflow-hidden bg-base-100">
      <div ref={mountRef} className="absolute inset-0" />
      
      <div className="relative z-20 max-w-md text-center px-8">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 ${
              currentTheme === 'cyberpunk' ? 'animate-spin' : 'animate-pulse'
            }`} style={{ animationDuration: '8s' }}>
              <div className="w-full h-full bg-base-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
        
        <h2 className={`text-4xl font-bold mb-6 ${
          currentTheme === 'light' 
            ? 'bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'
        }`}>
          {title}
        </h2>
        <p className="text-base-content/70 text-lg leading-relaxed mb-8">
          {subtitle}
        </p>
        
        <div className="flex justify-center gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                currentTheme === 'cyberpunk' ? 'bg-accent' :
                currentTheme === 'light' ? 'bg-primary/50' : 'bg-primary'
              } ${
                i % 2 === 0 ? "animate-pulse" : "animate-bounce"
              }`}
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: i % 2 === 0 ? '2s' : '3s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore(); // Using actual auth store

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 mt-8">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form - Restored original form submission */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Enhanced Three.js Pattern */}
      <EnhancedAuthPattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};

export default LoginPage;