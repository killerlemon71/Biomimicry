# Biomimetic Data Management // Peristaltic Queue Architecture 🐛

> **Interactive Web App & Proof of Concept:** [https://killerlemon71.github.io/Biomimicry/](https://killerlemon71.github.io/Biomimicry/)

An interactive software data pipeline inspired by the **segmented metachronal locomotion** and **hydrostatic backpressure feedback** of caterpillars.

---

## 💡 The Core Problem & Biological Solution

Traditional computer data systems push massive, monolithic piles of data across networks all at once. When network friction or downstream bottlenecks occur, buffers overflow, memory spikes, and streaming video players freeze abruptly with a spinning loader—**like an animal trying to jump forward with all legs at once and face-planting.**

Biology solved flow control and movement millions of years ago through **soft-bodied, segmented peristalsis**:
1. **Independent Body Rings (Chunks):** The body is a line of discrete rings. If one segment experiences friction, adjacent rings are completely protected.
2. **Muscle Squeeze (Adaptive Compression):** Circular muscles compress to pressurize fluid forward. In software, this dynamically compresses video chunks from 1080p to 480p when entering weak signal zones (e.g., trains entering tunnels) so playback flexes without stopping.
3. **Sticky Feet / Prolegs (WAL Checkpoints):** Abdominal prolegs hook securely into the branch before the next segment advances. The animal never moves all legs at once. In software, Write-Ahead Log (WAL) offsets commit sequentially, guaranteeing zero dropped packets.
4. **Fluid Backpressure (Self-Regulation):** If the front bumps into an obstacle, hydrostatic coelomic pressure naturally pushes backward to the tail, safely halting ingestion upstream without buffer overflow.

---

## 🚀 Interactive Situations Demonstrated in the Web App

1. **🟢 Situation 01: Normal Wi-Fi (5G Highway)**
   - High-speed 1080p stream flowing chunk-by-chunk with bounded latency and steady proleg commits.
2. **🟡 Situation 02: Weak Wi-Fi (Train Tunnel Test)**
   - Signal drops from 5G to 3G. Instead of an annoying buffering spinner, Node 02's muscles squeeze, dynamically compressing chunks to 480p so video keeps playing seamlessly.
3. **🔴 Situation 03: Hit a Wall (Receiver Obstacle)**
   - Downstream receiver stalls. Hydrostatic backpressure travels upstream, prolegs lock buffer offsets, and ingestion halts safely with **0.00% packet loss**.

---

## ⚙️ Academic & Industry Standards

Computer networking independently rediscovered this mechanism in the **IEEE 802.1Qch ("Peristaltic Shaper")** standard using **Cyclic Queuing and Forwarding (CQF)** for Time-Sensitive Networking (TSN) in automotive drive-by-wire and industrial robotics.

---

## 👥 Authors
- Project Team: T-202, T-209, T-218
- Live Demo: [https://killerlemon71.github.io/Biomimicry/](https://killerlemon71.github.io/Biomimicry/)