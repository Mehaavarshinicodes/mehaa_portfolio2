import { useState, useEffect } from 'react';
import type { ElementType } from 'react';
import Section from '../Section';
import { Lock, X, ArrowRight } from 'lucide-react';

const weeks = Array.from({ length: 21 }, (_, i) => i); // 0..20

type Bullet = string | { text: string; subBullets: string[] };

interface Photo {
  src: string;
  alt: string;
  /** Diagrams / wide images: shown large, full width of the panel */
  wide?: boolean;
}

interface Model3D {
  src: string;
  alt: string;
  caption?: string;
}

interface WeekTable {
  headers: string[];
  rows: string[][];
}

interface WeekSection {
  heading?: string;
  /** 1 = major part (e.g. "3D Printing"), 2 = default heading, 3 = sub-heading / step */
  level?: 1 | 2 | 3;
  paragraphs?: string[];
  /** A workflow rendered as a chain: ['A', 'B', 'C'] -> A → B → C */
  flow?: string[];
  bullets?: Bullet[];
  table?: WeekTable;
  /** Photos shown inline, right below this section's content */
  photos?: Photo[];
  /** Interactive, rotatable 3D models (.glb) shown after the photos */
  models?: Model3D[];
}

interface WeekDetail {
  subtitle: string;
  sections: WeekSection[];
  /** Optional photos shown at the top of the panel (used by weeks 0-3) */
  photos: Photo[];
}

const img = (file: string) => `${import.meta.env.BASE_URL}protosem/${file}`;

const weekDetails: Record<number, WeekDetail> = {
  0: {
    subtitle: 'at PRICE Protosem – Key Highlights',
    photos: [
      { src: `${import.meta.env.BASE_URL}protosem/week0-forge-lab.jpg`, alt: 'Working session at the FORGE Innovation & Ventures lab' },
      { src: `${import.meta.env.BASE_URL}protosem/week0-team.jpg`, alt: 'With teammates in FORGE polo tees' },
      { src: `${import.meta.env.BASE_URL}protosem/week0-yep-kickoff.jpg`, alt: 'YEP Kickoff Batch 2026 session screen' },
    ],
    sections: [
      {
        bullets: [
          'Joined PRICE (Phygital Retail Intelligent Commerce & Entrepreneurship) at FORGE Innovation & Ventures, KCT Tech Park after receiving a second opportunity to apply and successfully clearing the interview.',
          'Attended Fusion 360 sessions before the program began, gaining early exposure to the protosem learning environment.',
        ],
      },
      {
        heading: 'Day 1 – New Faces and New Spaces',
        bullets: [
          'Participated in an ice-breaker activity and interacted with fellow participants.',
          {
            text: 'Took a tour of FORGE, exploring:',
            subBullets: ['3D Printing Machines', 'Laser Cutting Machines', 'HW Junction', 'Innovation workspaces and prototyping facilities'],
          },
        ],
      },
      {
        heading: 'Day 2 – Understanding Ourselves',
        bullets: [
          'Completed the 16 Personalities Test and identified as INFP (Mediator).',
          'Explored Zen Pencils comics.',
          'Presented insights on "Life\'s Pursuit" by Dr. A.P.J. Abdul Kalam, focusing on dreams, goals, and purpose.',
        ],
      },
      {
        heading: 'Day 3 – Teamwork and Challenges',
        bullets: [
          'Formed the first Beta Teams.',
          'Attended an introductory session on IDEX.',
          'Participated in the Imposter Game.',
          'Took part in the Marshmallow Tower Challenge, learning the importance of teamwork, communication, and following instructions.',
        ],
      },
      {
        heading: 'Day 4 – Technology and Leadership',
        bullets: [
          'Attended a Tech Talk on Prompt Engineering by Bhuvanesh.',
          'Served as the Emcee for the PRICE Inauguration Ceremony.',
          'Experienced first-time college event emceeing, developing confidence in public speaking.',
          'Listened to insights from Mr. Kumar Rajagopalan, CEO of the Retailers Association of India (RAI).',
        ],
      },
      {
        heading: 'Day 5 – Reflection and Future Opportunities',
        bullets: [
          'Participated in the YEP Kickoff Session for Entrepreneur\'s Day.',
          {
            text: 'Heard from entrepreneurs:',
            subBullets: ['Mr. Ramakrishna (Founder, Thulsi Pharmacy)', 'Mrs. Swathi (Founder, A Toddle Thing; KCT Alumna)'],
          },
          'Took part in a week recap and reflection session.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 0',
        bullets: [
          'Built new connections with students across institutions.',
          'Gained exposure to innovation, entrepreneurship, and prototyping.',
          'Learned about personality traits and self-awareness.',
          'Developed teamwork and communication skills through activities.',
          'Enhanced understanding of AI through Prompt Engineering.',
          'Achieved a personal milestone by emceeing a college event.',
          'Experienced the hands-on, experiential learning approach of PRICE Protosem.',
        ],
      },
    ],
  },
  1: {
    subtitle: 'Introduction to Technology, Design Thinking, and Retail',
    photos: [
      { src: `${import.meta.env.BASE_URL}protosem/week1-presentation.jpeg`, alt: 'A presentation on Design Thinking' },
      { src: `${import.meta.env.BASE_URL}protosem/week1-design-thinking.jpeg`, alt: 'Design Thinking session' },
      { src: `${import.meta.env.BASE_URL}protosem/week1-session.jpeg`, alt: 'Team members discussing during a session' },
    ],
    sections: [
      {
        bullets: [
          'Week 1 of the PRICE Protosem program provided an exciting introduction to technology, design thinking, and the retail industry.',
          'Focused on understanding real-world business challenges, developing an entrepreneurial mindset, and exploring how technology can be used to solve industry problems.',
        ],
      },
      {
        heading: 'Day 1 – Tech Talk & Design Thinking',
        bullets: [
          'Attended a Tech Talk on Instagram\'s Recommendation Algorithm, learning how data-driven systems personalize user experiences and influence content discovery.',
          'Participated in a Design Thinking session conducted by Dr. Lakshmi Meera, exploring user-centric problem-solving approaches.',
          'Gained an overview of the Food & Beverages Retail Industry, understanding its structure, stakeholders, and current trends.',
        ],
      },
      {
        heading: 'Day 2 – Industry Analysis',
        bullets: [
          'Explored the Value Chain and SWOT Analysis of the Food & Beverages sector as a team.',
          'Identified key business processes, strengths, weaknesses, opportunities, and challenges within the industry, laying the foundation for future problem identification and solution development.',
        ],
      },
      {
        heading: 'Day 3 – Decision Making & Portfolios',
        bullets: [
          'Attended a Tech Talk on Prospect Theory, gaining insights into human decision-making and consumer behavior.',
          'Started building our professional portfolios, learning how to effectively showcase our skills, projects, and achievements.',
        ],
      },
      {
        heading: 'Day 4 & 5 – Inspiration & Leadership',
        bullets: [
          'Attended a Tech Talk on Base44.',
          'Participated in sessions on Goal, Vision, and Glory.',
          'Listened to inspiring guest lectures by Sabareesh Natarajan, Pranesh, and Mounish Thangaraj. Their experiences and perspectives offered valuable lessons on innovation, career growth, leadership, and entrepreneurship.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 1',
        bullets: [
          'Established a strong foundation for the Protosem journey by combining technology, business understanding, design thinking, and personal development.',
          'Encouraged to approach problems with curiosity, creativity, and a solution-oriented mindset.',
        ],
      },
    ],
  },
  2: {
    subtitle: 'Problem Identification, Algorithms, and App Development',
    photos: [
      { src: `${import.meta.env.BASE_URL}protosem/week2-5s-methodology.jpeg`, alt: '5S methodology activity session' },
      { src: `${import.meta.env.BASE_URL}protosem/week2-scratch-meme.png`, alt: 'Team meme created using Scratch' },
      { src: `${import.meta.env.BASE_URL}protosem/week2-app-inventor.png`, alt: 'Building an app using MIT App Inventor' },
    ],
    sections: [
      {
        bullets: [
          'Week 2 was focused on understanding problems, developing logical thinking, and building practical solutions.',
        ],
      },
      {
        heading: 'Day 1 – Problem Statements & 5S',
        bullets: [
          'Our beta team discussed various challenges in the retail industry and identified a potential problem statement to work on.',
          'Attended a session on the 5S methodology and implemented its principles through practical activities, understanding the importance of workplace organization, efficiency, and continuous improvement.',
        ],
      },
      {
        heading: 'Day 2 – Algorithms',
        bullets: [
          'Spent the day learning about algorithms, exploring the fundamentals of coding logic.',
          'Participated in an engaging activity that demonstrated how algorithms work and how different approaches can affect performance, strengthening problem-solving and computational thinking skills.',
        ],
      },
      {
        heading: 'Day 3 – Scratch',
        bullets: [
          'Introduced to Scratch, a visual programming platform.',
          'Created a meme using Scratch as part of a team activity and won first place among the participating teams — a fun and interactive way to understand programming concepts and logic building.',
        ],
      },
      {
        heading: 'Day 4 – Validation & App Development',
        bullets: [
          'Spent the first half of the day validating and refining problem statements to ensure they addressed real user needs.',
          'Transformed these ideas into functional mobile applications using MIT App Inventor in the second half, gaining hands-on experience in rapid application development and prototyping.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 2',
        bullets: [
          'Moved from identifying problems to developing logical solutions and building working prototypes.',
          'Improved teamwork and creativity through hands-on activities.',
        ],
      },
    ],
  },
  3: {
    subtitle: 'Linux, Automation, Cloud, and Electronics',
    photos: [
      { src: `${import.meta.env.BASE_URL}protosem/week3-linux-setup.jpeg`, alt: 'Setting up and booting a Linux distro' },
      { src: `${import.meta.env.BASE_URL}protosem/week3-docker-cloud.png`, alt: 'Working with Docker and cloud deployment' },
      { src: `${import.meta.env.BASE_URL}protosem/week3-soldering.jpeg`, alt: 'Soldering components on a pin board' },
    ],
    sections: [
      {
        bullets: [
          'Week 3 provided exposure to a wide range of technologies, from operating systems and cloud computing to workflow automation and basic electronics.',
        ],
      },
      {
        heading: 'Day 1 – Linux',
        bullets: [
          'Learned about operating systems, with a particular focus on Linux and its various distributions.',
          'Explored the differences between popular Linux distros and learned how to boot Linux on our laptops.',
          'Built a small project using the Linux environment to reinforce our understanding.',
        ],
      },
      {
        heading: 'Day 2 – Terminal Games, Docker & Cloud',
        bullets: [
          'Developed a terminal-based game in Linux, becoming more comfortable with the command line and programming fundamentals.',
          'Introduced to containerization using Docker and learned how containers simplify application deployment.',
          'Deployed our game and gained an introduction to cloud technologies and their real-world applications.',
        ],
      },
      {
        heading: 'Day 3 – Workflow Automation',
        bullets: [
          'Explored tools and techniques for automating repetitive tasks and improving productivity.',
          'Connected my Obsidian vault to Antigravity as a practical implementation, creating a workflow that automatically updates the Protosem section of my portfolio every week — demonstrating the power of automation in reducing manual effort and maintaining consistency.',
        ],
      },
      {
        heading: 'Day 4 – Electronics Fundamentals',
        bullets: [
          'Introduced to the fundamentals of electrical and electronic components.',
          'Built and tested various circuit simulations using Tinkercad while conducting interactive experiments to better understand how electrical systems work.',
        ],
      },
      {
        heading: 'Day 5 – Multimeters & Soldering',
        bullets: [
          'Learned how to use a multimeter to measure electrical quantities and troubleshoot circuits.',
          'Moved to hands-on hardware work by building a circuit on a pin board and soldering the components together, gaining practical experience in circuit assembly and electronics prototyping.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 3',
        bullets: [
          'Combined software, automation, cloud concepts, and hardware fundamentals into one well-rounded week.',
          'Connected theory with practical implementation across multiple domains.',
        ],
      },
    ],
  },
  4: {
    subtitle: 'Electronics & Computational Hardware',
    photos: [], // Week 4 photos are placed inline inside the sections below
    sections: [
      {
        paragraphs: [
          'Week 4 introduced me to electronics, microcontrollers, sensors, actuators, and IoT-based systems. I started with the basics of Arduino Uno and gradually progressed to ESP32-based projects involving multiple sensors and an IoT dashboard.',
        ],
      },
      {
        heading: 'Day 1 — Introduction to Microcontrollers & Arduino Uno',
        paragraphs: [
          'I was introduced to microcontrollers and their role in controlling electronic systems. I learned about the Arduino Uno, its pins, digital input/output, and how programs are uploaded to the board.',
          'As my first hands-on activity, I programmed an LED to blink with specific ON and OFF intervals. This helped me understand the basic relationship between code, digital signals, and physical output.',
        ],
        photos: [{ src: img('week4-arduino-led-blink.jpg'), alt: 'Arduino Uno with an LED blinking at set intervals' }],
      },
      {
        heading: 'Day 2 — Sensors & Actuators',
        paragraphs: [
          'I explored different types of sensors and actuators and learned how they can be integrated with a microcontroller.',
        ],
        bullets: [
          'PIR sensor — detects motion',
          'DHT11 — measures temperature and humidity',
          'IR sensor — detects objects/infrared signals',
          'OLED display — displays information',
          'Joystick — provides directional and analog input',
        ],
      },
      {
        paragraphs: [
          'I learned how sensors provide input to the microcontroller, which processes the data and produces an appropriate output through actuators or displays.',
        ],
        photos: [{ src: img('week4-sensors-actuators.jpg'), alt: 'Working with sensors and actuators' }],
      },
      {
        heading: 'Day 3 — ESP32 & Sensor Integration',
        paragraphs: [
          'I was introduced to the ESP32, a more powerful microcontroller with built-in wireless connectivity.',
          'I integrated components such as an ultrasonic sensor, OLED display, and joystick. This helped me understand how multiple components can communicate with a single microcontroller and how sensor data can be processed and displayed in real time.',
        ],
        photos: [{ src: img('week4-esp32-sensors.jpg'), alt: 'ESP32 connected to an ultrasonic sensor, OLED display and joystick' }],
      },
      {
        heading: 'Day 4 — ESP32 & IoT',
        paragraphs: [
          'The final day focused on combining ESP32 with IoT concepts. I worked on two applications:',
        ],
      },
      {
        heading: 'Traffic Controller Game',
        level: 3,
        paragraphs: [
          'A small interactive project that helped me understand how inputs, logic, and outputs can be combined to simulate a traffic-control system.',
        ],
        photos: [{ src: img('week4-traffic-controller.jpg'), alt: 'Traffic Controller Game running on the ESP32' }],
      },
      {
        heading: 'Digital Pet',
        level: 3,
        paragraphs: [
          'I developed an interactive digital pet using sensors and an OLED display. The project demonstrated how sensor inputs can affect the state of a virtual system and how the ESP32 can be used to create an interactive IoT application.',
        ],
        photos: [{ src: img('week4-digital-pet.jpg'), alt: 'Digital Pet displayed on the OLED screen' }],
      },
    ],
  },
  6: {
    subtitle: 'Digital Fabrication — 3D Printing & Laser Cutting',
    photos: [], // Week 6 photos are placed inline inside the sections below
    sections: [
      {
        paragraphs: [
          'Week 6 introduced me to digital fabrication, particularly 3D printing and laser cutting. I learned how a digital design can be converted into a physical object using computer-controlled manufacturing processes.',
          'The week focused on understanding the complete workflow — from preparing a digital model to configuring the manufacturing machine and producing the final physical object.',
        ],
      },

      // ───────────────────────── 3D PRINTING ─────────────────────────
      { heading: '3D Printing', level: 1 },
      {
        heading: 'What is 3D Printing?',
        paragraphs: [
          '3D printing is an additive manufacturing process in which a physical object is created by depositing or solidifying material layer by layer based on a digital 3D model.',
          'Unlike traditional manufacturing methods that remove material from a larger block, 3D printing adds material only where it is required.',
        ],
      },
      {
        paragraphs: ['Typical workflow:'],
        flow: ['3D Model', 'STL File', 'Slicing', 'G-code', '3D Printer', 'Layer-by-Layer Printing', 'Final Object'],
        photos: [{ src: img('week6-3dp-printer.jpg'), alt: 'Bambu Lab 3D printer at FORGE' }],
      },
      {
        heading: 'Stages of 3D Printing',
        photos: [{ src: img('week6-3dp-stages.png'), alt: 'Stages of 3D printing: concept, 3D CAD design, STL file, G-code, printing, post-processing', wide: true }],
      },
      {
        heading: 'Types of 3D Printing',
        photos: [{ src: img('week6-3dp-types.jpeg'), alt: 'Types of 3D printing: FDM, SLA, DLP, SLS', wide: true }],
      },
      {
        bullets: [
          { text: 'FDM — Fused Deposition Modeling', subBullets: ['A thermoplastic filament is melted and deposited through a nozzle layer by layer. Common materials include PLA, ABS, and PETG.'] },
          { text: 'SLA — Stereolithography', subBullets: ['Liquid photopolymer resin is selectively cured using a light source. Its key advantage is high detail and smooth surface finish.'] },
          { text: 'SLS — Selective Laser Sintering', subBullets: ['A laser selectively fuses powdered material to create the object. A key advantage is that complex geometries can be produced without traditional support structures.'] },
          { text: 'DLP — Digital Light Processing', subBullets: ['A projected light source cures an entire layer of resin simultaneously.'] },
        ],
      },
      {
        heading: 'Manufacturing Process of 3D Printing',
        paragraphs: ['3D printing is an additive manufacturing process.'],
        photos: [{ src: img('week6-3dp-process.png'), alt: 'Manufacturing process of 3D printing: digital design, layer slicing, material deposition, layer-by-layer construction, finished product', wide: true }],
      },
      {
        paragraphs: [
          'In FDM printing, the filament is heated until it becomes sufficiently soft and is extruded through a nozzle. The printer deposits the material along the paths defined by the G-code. Once one layer is completed, the print head or build platform moves to the next layer.',
        ],
      },
      {
        heading: 'Advantages & Disadvantages of 3D Printing',
        table: {
          headers: ['Advantages', 'Disadvantages'],
          rows: [
            ['Enables rapid prototyping', 'Generally slower than mass-production methods'],
            ['Can produce complex geometries', 'Surface finish may require post-processing'],
            ['Supports customized designs', 'Material selection depends on the printer'],
            ['Produces less material waste', 'Parts can have weaker layer-to-layer strength'],
            ['Easy to modify and reproduce designs', 'Large objects may require long printing times'],
            ['Suitable for small-batch production', 'Printer and material costs can be high'],
            ['Allows physical testing of digital designs', 'Print quality depends heavily on settings and calibration'],
          ],
        },
      },
      {
        heading: 'Limitations of 3D Printing',
        table: {
          headers: ['Limitation', 'Description'],
          rows: [
            ['Build volume', 'The printer limits the maximum size of the object.'],
            ['Printing orientation', 'Orientation affects strength, supports, and print quality.'],
            ['Overhangs', 'Some geometries require support structures.'],
            ['Layer lines', 'Visible layers may affect surface finish.'],
            ['Material limitations', 'Different printers support different materials.'],
            ['Printing time', 'Complex or large models can take several hours.'],
          ],
        },
      },
      {
        heading: 'My 3D Printing Work',
        paragraphs: ['As part of the practical activity, I worked through the complete preparation process for a 3D print.'],
      },
      {
        heading: 'Step 1 — Obtaining the STL File',
        level: 3,
        paragraphs: ['I first downloaded the required STL file, which contained the geometry of the object to be printed.'],
      },
      {
        heading: 'Step 2 — Importing into Bambu Studio',
        level: 3,
        paragraphs: ['I opened the model in Bambu Studio, the slicing software used to prepare the model for printing.'],
        models: [{ src: img('week6-3d-model.glb'), alt: 'Interactive 3D model of my print' }],
      },
      {
        heading: 'Step 3 — Model Preparation',
        level: 3,
        paragraphs: ['I positioned the model on the virtual build plate and inspected its orientation.'],
      },
      {
        heading: 'Step 4 — Adding Supports',
        level: 3,
        paragraphs: ['I identified areas where the geometry required additional support and added support structures. Supports prevent unsupported sections and overhangs from collapsing during printing.'],
      },
      {
        heading: 'Step 5 — Slicing',
        level: 3,
        paragraphs: ['I then sliced the model into individual layers. The software generated the toolpaths required by the printer. This allowed me to preview how the printer would construct the object layer by layer before sending it for printing.'],
      },
      {
        heading: 'Learning Outcome',
        level: 3,
        paragraphs: ['Through this activity, I understood the complete workflow of digital 3D model → STL → slicing → supports → printer-ready file, and how design orientation and slicing parameters affect the final physical output.'],
        photos: [{ src: img('week6-3dp-bambu-studio.jpeg'), alt: 'Model prepared on the build plate in Bambu Studio', wide: true }],
        
      },

      {
        heading: 'Bambu Lab H2S — Specifications',
        photos: [
          { src: img('week6-bambu-h2s-specs.png'), alt: 'Bambu Lab H2S specifications', wide: true },
          { src: img('week6-bambu-h2s-working.jpg'), alt: 'Operating the Bambu Lab H2S at FORGE' },
        ],
      },
      {
        heading: 'PLA Filament — Specifications',
        photos: [
          { src: img('week6-pla-filament-specs.png'), alt: 'PLA filament specifications', wide: true },
        ],
      },

      // ───────────────────────── LASER CUTTING ─────────────────────────
      { heading: 'Laser Cutting', level: 1 },
      {
        heading: 'What is Laser Cutting?',
        paragraphs: [
          'Laser cutting is a digital manufacturing process that uses a focused laser beam to cut, engrave, or mark materials according to a digital design.',
          'The laser concentrates energy onto a small area of the material. Depending on the required operation and settings, the material can be melted, burned, vaporized, or removed.',
        ],
      },
      {
        paragraphs: ['Typical workflow:'],
        flow: ['Digital Design', 'DXF File', 'RDWorks', 'Layer Configuration', 'Machine Setup', 'Laser Processing', 'Finished Model'],
      },
      {
        heading: 'Stages of Laser Cutting',
        table: {
          headers: ['Stage', 'Description'],
          rows: [
            ['1. Design Creation', 'The required design is created or selected using a suitable graphics or CAD application.'],
            ['2. File Conversion', 'The design is converted into a machine-compatible vector format such as DXF. Vector geometry is useful because the laser follows defined paths rather than treating the design as a normal image.'],
            ['3. Import into Laser Software', 'The DXF file is imported into software such as RDWorks, where the design can be prepared for the laser cutting machine.'],
            ['4. Layer Assignment', 'Different elements of the design can be assigned different operations, such as cut and scan/engrave. Different layers can also be configured with appropriate machine parameters.'],
            ['5. Machine Configuration', 'The material is positioned on the laser cutting bed, and the required parameters are configured. Important parameters include laser power, speed, cutting/engraving mode, number of passes, and focus.'],
            ['6. Laser Processing', 'The laser follows the paths specified by the design and performs the selected operation.'],
            ['7. Final Inspection', 'The completed piece is removed and inspected for cutting accuracy, engraving quality, edge quality, alignment, and overall appearance.'],
          ],
        },
      },
      {
        heading: 'Types of Laser Cutting',
        bullets: [
          { text: 'CO₂ Laser', subBullets: ['CO₂ lasers are widely used for cutting and engraving materials such as acrylic, wood, plastic, paper, and fabric.'] },
          { text: 'Fiber Laser', subBullets: ['Fiber lasers are commonly used for processing metals and are widely used in industrial applications.'] },
          { text: 'Diode Laser', subBullets: ['Diode lasers are generally used for lower-power cutting and engraving applications.'] },
        ],
      },
      {
        heading: 'Laser Manufacturing Processes',
        table: {
          headers: ['Process', 'Description'],
          rows: [
            ['Laser Cutting', 'The laser completely penetrates the material along a defined path to separate the material.'],
            ['Laser Engraving', 'The laser removes or modifies only part of the material surface to create text, patterns, or images.'],
            ['Laser Marking', 'The surface is altered to create a permanent mark without necessarily removing significant material.'],
            ['Laser Scanning', 'The laser moves across an area according to a scanning pattern to create an engraved or filled region.'],
          ],
        },
      },
      {
        heading: 'Manufacturing Process of Laser Cutting',
        paragraphs: ['Laser cutting is primarily a subtractive manufacturing process.'],
        flow: ['Digital Vector Design', 'Toolpath Generation', 'Laser Beam', 'Material Removal', 'Final Part'],
      },
      {
        paragraphs: [
          'Unlike additive manufacturing, where material is added layer by layer, laser cutting removes material from a sheet or workpiece to obtain the required shape.',
        ],
      },
      {
        heading: 'Advantages & Disadvantages of Laser Cutting',
        table: {
          headers: ['Advantages', 'Disadvantages'],
          rows: [
            ['High precision and accuracy', 'Equipment can be expensive'],
            ['Fast processing for suitable materials', 'Some materials produce smoke or fumes'],
            ['Can create intricate designs', 'Incorrect settings can cause burning'],
            ['Minimal physical contact with the material', 'Material thickness affects cutting capability'],
            ['Easy to control using digital designs', 'Requires proper calibration and focusing'],
            ['Highly repeatable', 'Requires appropriate safety precautions'],
            ['Can perform both cutting and engraving', 'Heat can affect the material'],
          ],
        },
      },
      {
        heading: 'Limitations of Laser Cutting',
        table: {
          headers: ['Limitation', 'Description'],
          rows: [
            ['Material thickness', 'Maximum thickness depends on laser power.'],
            ['Material compatibility', 'Not every material is suitable for laser processing.'],
            ['Heat effects', 'Heat can cause melting, burning, or discoloration.'],
            ['Cutting depth', 'Limited by the power and capability of the machine.'],
            ['3D geometry', 'Conventional laser cutting is primarily suited to flat or sheet materials.'],
            ['Safety', 'Requires controlled operation and proper ventilation.'],
          ],
        },
      },
      {
        heading: 'My Laser Cutting Work',
        paragraphs: ['For the practical activity, I followed the complete workflow of converting a digital design into a physical laser-cut model.'],
      },
      {
        heading: 'Step 1 — Selecting the Design',
        level: 3,
        paragraphs: ['I selected an image/design that I wanted to convert into a physical model.'],
      },
      {
        heading: 'Step 2 — Converting the Design to DXF',
        level: 3,
        paragraphs: ['The design was converted into the DXF format, which represents the geometry as vector-based information suitable for further processing.'],
      },
      {
        heading: 'Step 3 — Importing into RDWorks',
        level: 3,
        paragraphs: ['I opened the DXF file in RDWorks, the software used to prepare the design for the laser cutting machine. I inspected the imported geometry and organized the different elements into appropriate layers.'],
      },
      {
        heading: 'Step 4 — Configuring Operations',
        level: 3,
        paragraphs: ['I explored the different operations available in RDWorks and assigned the required layers for cutting and scanning/engraving. This helped me understand how the same design can contain different manufacturing operations.'],
      },
      {
        heading: 'Step 5 — Exploring Machine Parameters',
        level: 3,
        paragraphs: ['I explored how parameters such as speed and power affect the final result. For example, changing the speed and power can influence the depth of engraving, cutting ability, and the appearance of the material.'],
      },
      {
        heading: 'Step 6 — Laser Cutting',
        level: 3,
        paragraphs: ['After preparing the design and configuring the required settings, I sent the design to the laser cutting machine and produced my physical model.'],
      },
      {
        heading: 'Learning Outcome',
        level: 3,
        paragraphs: ['This activity gave me hands-on experience with the complete digital fabrication workflow:'],
        flow: ['Design', 'DXF Conversion', 'RDWorks', 'Layer Configuration', 'Machine Settings', 'Laser Processing', 'Physical Model'],
      },
      {
        paragraphs: [
          'I also learned that machine parameters are critical to the quality of the final product. The correct combination of speed, power, focus, and operation type is necessary to achieve a clean and accurate result.',
        ],
        photos: [
          { src: img('week6-laser-cut-model.jpg'), alt: 'Laser-cut and engraved model' },
          { src: img('week6-laser-machine.jpg'), alt: 'Working at the laser cutting machine' },
        ],
      },

      // ───────────────────────── COMPARISON ─────────────────────────
      {
        heading: '3D Printing vs Laser Cutting',
        level: 1,
        table: {
          headers: ['Feature', '3D Printing', 'Laser Cutting'],
          rows: [
            ['Manufacturing type', 'Additive', 'Subtractive'],
            ['Input', '3D model', '2D vector design'],
            ['Common file', 'STL', 'DXF'],
            ['Basic process', 'Builds material layer by layer', 'Removes material along defined paths'],
            ['Typical software', 'Bambu Studio', 'RDWorks'],
            ['Main operations', 'Printing', 'Cutting, scanning, engraving'],
            ['Suitable for', '3D objects and complex geometries', 'Flat parts, panels, patterns, and engravings'],
            ['Material usage', 'Adds material to create the object', 'Removes material from a sheet'],
            ['Major limitation', 'Printing time and build volume', 'Material thickness and laser capability'],
          ],
        },
      },
      {
        heading: 'Overall Learning',
        level: 1,
        paragraphs: [
          'Week 6 helped me understand the difference between additive and subtractive manufacturing through hands-on experience. I learned how a digital design can be transformed into a physical product using two different fabrication approaches, while also understanding the importance of file formats, machine parameters, toolpaths, supports, and process planning.',
        ],
      },
    ],
  },
};

function BulletItem({ bullet }: { bullet: Bullet }) {
  if (typeof bullet === 'string') {
    return (
      <li className="flex items-start gap-2 text-sm text-gray-300 font-light leading-relaxed">
        <span className="text-blue-400 mt-1.5 text-[6px]">●</span>
        <span>{bullet}</span>
      </li>
    );
  }
  return (
    <li className="text-sm text-gray-300 font-light leading-relaxed">
      <div className="flex items-start gap-2">
        <span className="text-blue-400 mt-1.5 text-[6px]">●</span>
        <span>{bullet.text}</span>
      </div>
      <ul className="mt-1.5 ml-5 space-y-1">
        {bullet.subBullets.map((sub) => (
          <li key={sub} className="flex items-start gap-2 text-sm text-gray-400 font-light leading-relaxed">
            <span className="text-blue-500/60 mt-1.5 text-[5px]">○</span>
            <span>{sub}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Small square thumbnails at the top of the panel (weeks 0-3) */
function PhotoRow({ photos, className = '' }: { photos: Photo[]; className?: string }) {
  if (photos.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="w-36 sm:w-44 rounded-lg overflow-hidden border border-white/10 shadow-lg hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
        >
          <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover aspect-square" />
        </div>
      ))}
    </div>
  );
}

/** Larger photos shown in the flow of the content (weeks 4 & 6). Keeps original aspect ratio. */
function InlinePhotos({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;
  return (
    <div className="flex flex-wrap items-start gap-4 pt-1">
      {photos.map((photo) => (
        <figure
          key={photo.src}
          className={`rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/20 ${
            photo.wide ? 'w-full max-w-3xl' : 'max-w-full'
          }`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className={photo.wide ? 'w-full h-auto' : 'h-56 sm:h-72 w-auto max-w-full object-contain'}
          />
        </figure>
      ))}
    </div>
  );
}

const ModelViewerTag = 'model-viewer' as unknown as ElementType;

/** Rotatable 3D model (.glb) using Google's <model-viewer> web component */
function ModelViewer({ models }: { models: Model3D[] }) {
  // Load the web component only when a 3D model is actually shown
  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {models.map((m) => (
        <figure
          key={m.src}
          className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-black/30 shadow-xl"
        >
          <ModelViewerTag
            src={m.src}
            alt={m.alt}
            camera-controls=""
            auto-rotate=""
            touch-action="pan-y"
            shadow-intensity="1"
            exposure="1"
            style={{ display: 'block', width: '100%', height: 'min(75vh, 640px)', minHeight: '360px', background: 'transparent' }}
          />
          <figcaption className="px-4 py-3 text-center text-xs text-gray-400 font-light">
            {m.caption ?? 'Drag to rotate · scroll or pinch to zoom'}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function FlowChain({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs sm:text-sm text-blue-100 font-light">
            {step}
          </span>
          {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-blue-400/70 flex-shrink-0" />}
        </div>
      ))}
    </div>
  );
}

function DataTable({ table }: { table: WeekTable }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5">
          <tr>
            {table.headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {table.rows.map((row, r) => (
            <tr key={r} className="hover:bg-white/5 transition-colors">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-4 py-3 align-top leading-relaxed font-light ${c === 0 ? 'text-gray-200 font-normal' : 'text-gray-300'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeading({ text, level = 2 }: { text: string; level?: 1 | 2 | 3 }) {
  if (level === 1) {
    return (
      <h5 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight pt-4 pb-2 border-b border-white/10">
        {text}
      </h5>
    );
  }
  if (level === 3) {
    return <h6 className="text-sm font-semibold text-blue-300 mb-2 tracking-tight">{text}</h6>;
  }
  return <h5 className="text-base font-semibold text-white mb-2 tracking-tight">{text}</h5>;
}

function WeekDetailPanel({ week, detail, onClose }: { week: number; detail: WeekDetail; onClose: () => void }) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-fadeInUp">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-blue-400 font-display text-xs font-medium tracking-[0.25em] uppercase mb-1 opacity-80">Week {week}</p>
          <h4 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">{detail.subtitle}</h4>
        </div>
        <button
          onClick={onClose}
          aria-label="Close week details"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Top photos (weeks 0-3). Weeks 4 & 6 use inline photos inside sections instead. */}
      {detail.photos.length > 0 && <PhotoRow photos={detail.photos} className="mb-8" />}

      <div className="space-y-6">
        {detail.sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            {section.heading && <SectionHeading text={section.heading} level={section.level} />}

            {section.paragraphs?.map((p, i) => (
              <p key={i} className="text-sm text-gray-300 font-light leading-relaxed">
                {p}
              </p>
            ))}

            {section.flow && <FlowChain steps={section.flow} />}

            {section.bullets && (
              <ul className="space-y-2">
                {section.bullets.map((b, i) => (
                  <BulletItem key={i} bullet={b} />
                ))}
              </ul>
            )}

            {section.table && <DataTable table={section.table} />}

            {section.photos && <InlinePhotos photos={section.photos} />}

            {section.models && <ModelViewer models={section.models} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Protosem() {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  return (
    <Section id="protosem" title="Protosem">
      <div className="space-y-10">
        {/* Header card */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/10">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-tight">Innovation & Prototyping</h3>
          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-sm">
            Protosem is an intensive 20-week program focused on comprehensive product development, rapid prototyping, and solving complex problems.
            Follow my journey week by week as I transform ideas into fully functional, scalable prototypes.
          </p>
        </div>

        {/* Horizontally scrolling roadmap */}
        <div className="space-y-6">
          <p className="text-center text-gray-400 text-sm font-light">Weekly Journal — swipe to explore the roadmap</p>

          <div className="relative">
            {/* fade edges to hint scrollability */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div className="overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
              <div className="relative flex items-center gap-6 min-w-max px-6 py-4">
                {/* connecting line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-500/10 via-blue-400/40 to-blue-500/10" />

                {weeks.map((week) => {
                  const isActive = activeWeek === week;
                  const hasDetail = Boolean(weekDetails[week]);
                  return (
                    <button
                      key={week}
                      onClick={() => setActiveWeek(isActive ? null : week)}
                      className="relative snap-center flex-shrink-0 group"
                    >
                      <span
                        className={`relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-heading font-bold transition-all duration-300 z-10
                          ${isActive
                            ? 'bg-gradient-to-br from-blue-400 via-sky-400 to-indigo-500 text-white scale-110 shadow-[0_0_30px_rgba(56,189,248,0.55)]'
                            : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/15 text-gray-300 group-hover:from-blue-500/40 group-hover:to-indigo-600/40 group-hover:border-blue-400/40 group-hover:text-white group-hover:-translate-y-1'
                          }`}
                      >
                        {week}
                        {hasDetail && (
                          <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-blue-400'} shadow-[0_0_8px_rgba(56,189,248,0.8)]`} />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detail / update panel */}
        {activeWeek !== null && (
          weekDetails[activeWeek] ? (
            <WeekDetailPanel
              week={activeWeek}
              detail={weekDetails[activeWeek]}
              onClose={() => setActiveWeek(null)}
            />
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 border-dashed flex flex-col items-center gap-3 text-center animate-fadeInUp">
              <Lock className="w-5 h-5 text-gray-500" />
              <p className="text-gray-400 text-sm font-light">
                <span className="font-semibold text-white">Week {activeWeek}</span> update coming soon.
              </p>
            </div>
          )
        )}
      </div>
    </Section>
  );
}
