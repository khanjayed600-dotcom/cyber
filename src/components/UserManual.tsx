import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Terminal, 
  ShieldAlert, 
  Layers, 
  Binary, 
  Activity, 
  Cpu, 
  Radio, 
  FileCode, 
  Share2, 
  HelpCircle, 
  CheckCircle2, 
  Zap, 
  Play, 
  Network, 
  Trophy, 
  Compass, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check 
} from 'lucide-react';
import { Language } from '../types/network';
import { ActiveTab } from './Navbar';

interface UserManualProps {
  lang: Language;
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToTerminal?: (command: string) => void;
}

interface GuideSection {
  id: string;
  tabId: ActiveTab;
  titleBn: string;
  titleEn: string;
  category: 'core' | 'security' | 'tools' | 'labs';
  icon: React.ComponentType<{ className?: string }>;
  badgeBn: string;
  badgeEn: string;
  summaryBn: string;
  summaryEn: string;
  howToUseBn: string[];
  howToUseEn: string[];
  keyFeaturesBn: string[];
  keyFeaturesEn: string[];
  proTipBn: string;
  proTipEn?: string;
  sampleCommand?: string;
}

export const UserManual: React.FC<UserManualProps> = ({
  lang,
  onNavigateTab,
  onSendToTerminal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'security' | 'tools' | 'labs' | 'faq'>('all');
  const [expandedSection, setExpandedSection] = useState<string | null>('osi');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  const guides: GuideSection[] = [
    {
      id: 'osi',
      tabId: 'osi',
      titleBn: 'ওএসআই ৭-লেয়ার সিমুলেটর (OSI 7 Layers)',
      titleEn: 'OSI 7 Layers Simulator',
      category: 'core',
      icon: Layers,
      badgeBn: 'বেসিক নেটওয়ার্কিং',
      badgeEn: 'Core Networking',
      summaryBn: 'ইন্টারনেট ও নেটওয়ার্কের ভিত্তি ওএসআই মডেলের ৭টি লেয়ার (L7 থেকে L1) কীভাবে কাজ করে এবং ডেটা কীভাবে এনক্যাপসুলেশন ও ডি-এনক্যাপসুলেশন হয় তা প্র্যাকটিক্যালভাবে দেখার সিমুলেটর।',
      summaryEn: 'Interactive simulator visualizing how data moves through all 7 OSI layers with encapsulation, headers, and protocol mapping.',
      howToUseBn: [
        'লেয়ার লিস্ট থেকে যেকোনো লেয়ার (Layer 7 Application থেকে Layer 1 Physical) নির্বাচন করুন।',
        'প্রতিটি লেয়ারের PDU (যেমন Data, Segment, Packet, Frame, Bits) ও সংশ্লিষ্ট হার্ডওয়্যার (Router, Switch ইত্যাদি) দেখুন।',
        '"Send Packet" বাটনে চাপ দিন এবং সম্পূর্ণ ডাটা ট্রান্সমিশনের অ্যানিমেশন পর্যবেক্ষণ করুন।',
        'প্রতিটি লেয়ারে কীভাবে নতুন হেডার যোগ হয় তা ডানদিকের হেডার প্যানেলে লক্ষ্য করুন।'
      ],
      howToUseEn: [
        'Click on any layer from Layer 7 (Application) to Layer 1 (Physical).',
        'Inspect PDU types (Data, Segment, Packet, Frame, Bits) and associated networking devices.',
        'Click "Send Packet" to watch the step-by-step encapsulation and decapsulation animation.',
        'Review the header payload added at each layer in the right panel.'
      ],
      keyFeaturesBn: [
        'রিয়েল-টাইম এনক্যাপসুলেশন ও ডি-এনক্যাপসুলেশন ফ্লো',
        'প্রতিটি লেয়ারের জন্য ব্যবহৃত প্রোটোকল ও হার্ডওয়্যার ডিরেক্টরি',
        'হেডার বাইট বিশ্লেষণ ও প্যাকেট স্ট্রাকচার'
      ],
      keyFeaturesEn: [
        'Real-time encapsulation & decapsulation visualizer',
        'Layer-specific protocols and hardware mapping',
        'Header breakdown with byte-level details'
      ],
      proTipBn: 'টিপ: কোনো ডেটা প্রেরণের সময় L7 থেকে L1 এর দিকে এনক্যাপসুলেশন হয় এবং রিসিভারের কাছে L1 থেকে L7 এর দিকে ডি-এনক্যাপসুলেশন ঘটে।'
    },
    {
      id: 'cyber_tools',
      tabId: 'cyber_tools',
      titleBn: 'সাইবার সিকিউরিটি টুলস গাইড (Cyber Security Guide)',
      titleEn: 'Cyber Security Tools Guide',
      category: 'security',
      icon: ShieldAlert,
      badgeBn: 'সাইবার ডিফেন্স ও পেন্টেস্টিং',
      badgeEn: 'Cyber Defense & Pentesting',
      summaryBn: 'Nmap, Wireshark, Metasploit, Burp Suite, Hydra, Netcat, Aircrack-ng সহ জনপ্রিয় ইথিক্যাল হ্যাকিং ও ডিফেন্স টুলসের হ্যান্ডস-অন রেফারেন্স।',
      summaryEn: 'Comprehensive guide to top ethical hacking and defensive tools with live command transfer to the terminal.',
      howToUseBn: [
        'ক্যাটাগরি ফিল্টার থেকে "Network Recon", "Web Security", "Exploitation" ইত্যাদি নির্বাচন করুন।',
        'যেকোনো টুল কার্ডে ক্লিক করে তার উদ্দেশ্য, আসল কমান্ড সিনট্যাক্স এবং ব্যবহারের নিয়ম দেখুন।',
        '"টার্মিনালে পাঠান" (Send to Terminal) বাটনে চাপ দিলে কমান্ডটি সরাসরি "টার্মিনাল প্র্যাকটিস ল্যাব"-এ রান হওয়ার জন্য প্রস্তুত হয়ে যাবে!',
        'চাইলে "কপি" বাটনে চাপ দিয়ে কমান্ডটি আপনার সিস্টেমে ব্যবহারের জন্য কপি করতে পারেন।'
      ],
      howToUseEn: [
        'Filter tools by category such as Network Recon, Web Pentesting, Exploitation, or Forensics.',
        'Click any tool card to read its practical use cases, options, and defensive strategies.',
        'Click "Send to Terminal" to instantly load and execute the command in the Terminal Practice Lab.',
        'Use the copy button to save real commands for your own environment.'
      ],
      keyFeaturesBn: [
        'রিয়েল কমান্ড ও অপশনগুলোর পুঙ্খানুপুঙ্খ বাংলা ব্যাখ্যা',
        'এক ক্লিকেই ব্রাউজার টার্মিনালে কমান্ড টেস্ট করার সুবিধা',
        'সুরক্ষা ও ডিফেন্সিভ মেজারমেন্ট টিপস'
      ],
      keyFeaturesEn: [
        'Accurate real-world syntax with detailed parameter breakdown',
        'One-click integration with the browser terminal lab',
        'Defensive hardening tips for each attack vector'
      ],
      proTipBn: 'টিপ: "Send to Terminal" বাটনে ক্লিক করলে আপনাকে সরাসরি টার্মিনাল ল্যাবে নিয়ে যাওয়া হবে এবং কমান্ডটি তাৎক্ষণিক টেস্ট করতে পারবেন।',
      sampleCommand: 'nmap -sS -sV -O 192.168.1.1'
    },
    {
      id: 'terminal_practice',
      tabId: 'terminal_practice',
      titleBn: 'লিনাক্স টার্মিনাল প্র্যাকটিস ল্যাব (Terminal Practice Lab)',
      titleEn: 'Linux Terminal Practice Lab',
      category: 'tools',
      icon: Terminal,
      badgeBn: 'ইন্টারেক্টিভ কনসোল',
      badgeEn: 'Interactive Shell',
      summaryBn: 'কোনো সফটওয়্যার ইনস্টল ছাড়াই সরাসরি ব্রাউজারে লিনাক্স ও নেটওয়ার্কিং কমান্ড রান করার নিরাপদ স্যান্ডবক্স।',
      summaryEn: 'Interactive simulated Linux terminal environment supporting network diagnostics, shell utilities, and auto-completion.',
      howToUseBn: [
        'টার্মিনাল ইনপুট বক্সে কমান্ড লিখুন এবং Enter চাপুন। যেমন: "help", "ifconfig", "ping 8.8.8.8", "nmap 192.168.1.1"।',
        'অটো-কমপ্লিটের জন্য কমান্ড লেখার সময় কিবোর্ডের "Tab" বাটন চাপুন।',
        'পূর্বের রান করা কমান্ডগুলো দেখতে কিবোর্ডের "Up Arrow" এবং "Down Arrow" ব্যবহার করুন।',
        'উপরে থাকা "Quick Commands" বোতামগুলোতে ক্লিক করে সরাসরি এক ক্লিকেই কমান্ড এক্সিকিউট করতে পারবেন।'
      ],
      howToUseEn: [
        'Type any supported command and press Enter. Try "help", "ifconfig", "ping 8.8.8.8", or "route -n".',
        'Press the "Tab" key to trigger smart auto-completion.',
        'Use the Up and Down arrow keys to cycle through previous command history.',
        'Click any quick command chip above the prompt to run it instantly.'
      ],
      keyFeaturesBn: [
        'ifconfig, ip addr, ping, nmap, netstat, curl, iptables কমান্ড সাপোর্ট',
        'কিবোর্ড শর্টকাট (Tab auto-complete, Up/Down history)',
        'রিয়েলিস্টিক টার্মিনাল আউটপুট ও কালার স্কিম'
      ],
      keyFeaturesEn: [
        'Support for networking staples: ifconfig, ping, nmap, netstat, curl, iptables',
        'Smart auto-completion and bash history navigation',
        'Realistic dark shell UI with color-coded stdout'
      ],
      proTipBn: 'টিপ: সকল সাপোর্টেড কমান্ড দেখতে টার্মিনালে "help" লিখে এন্টার দিন। টার্মিনাল ক্লিয়ার করতে "clear" লিখুন।',
      sampleCommand: 'ping -c 4 8.8.8.8'
    },
    {
      id: 'linux',
      tabId: 'linux',
      titleBn: 'লিনাক্স হ্যান্ডবুক (Linux Handbook & Commands)',
      titleEn: 'Linux Handbook & Commands',
      category: 'tools',
      icon: Trophy,
      badgeBn: 'রেফারেন্স গাইড',
      badgeEn: 'Reference Guide',
      summaryBn: 'নেটওয়ার্ক অ্যাডমিন ও সাইবার সিকিউরিটি প্রফেশনালদের জন্য অতি প্রয়োজনীয় লিনাক্স কমান্ডের সুসংগঠিত রেফারেন্স ডিরেক্টরি।',
      summaryEn: 'Structured cheat sheet and manual of essential Linux networking, security, and administration commands.',
      howToUseBn: [
        'ক্যাটাগরি সিলেক্ট করুন (Networking, Security, Diagnostics, Package Management)।',
        'সার্চ বারে কমান্ডের নাম লিখে দ্রুত ফিল্টার করুন।',
        'প্রতিটি কমান্ডের সিনট্যাক্স, ফ্ল্যাগ (Flags) এবং বাস্তব জীবনের উদাহরণ দেখুন।',
        '"Open in Terminal" বাটনে চাপ দিয়ে কমান্ডটি সরাসরি টার্মিনালে নিয়ে রান করুন।'
      ],
      howToUseEn: [
        'Filter by category: Network Configuration, Security & Audit, System Diagnostics.',
        'Search for specific command names or descriptions in real-time.',
        'Learn essential command flags and real production use cases.',
        'Click "Open in Terminal" to jump to the practice lab with the command pre-loaded.'
      ],
      keyFeaturesBn: [
        'সহজ বাংলা ব্যাখ্যা ও সিনট্যাক্স ব্রেকডাউন',
        'সরাসরি কপি এবং টার্মিনালে টেস্ট করার ইন্টিগ্রেশন',
        'দৈনন্দিন নেটওয়ার্কিং ট্রাবলশুটিং উদাহরণ'
      ],
      keyFeaturesEn: [
        'Clear explanations with syntax breakdown',
        'Copy to clipboard and direct terminal handoff',
        'Realistic troubleshooting scenarios'
      ],
      proTipBn: 'টিপ: নেটওয়ার্ক কনফিগারেশন দেখতে "ip addr" এবং রাউটিং টেবিল দেখতে "ip route" ব্যবহার করুন।'
    },
    {
      id: 'traffic',
      tabId: 'traffic',
      titleBn: 'লাইভ ট্রাফিক ও নেটওয়ার্ক টপোলজি (Live Traffic & Topology)',
      titleEn: 'Live Traffic & Network Topology',
      category: 'labs',
      icon: Activity,
      badgeBn: 'রিয়েল-টাইম ট্রাফিক',
      badgeEn: 'Real-time Traffic',
      summaryBn: 'লোকাল ল্যান (LAN), গেটওয়ে (Gateway) এবং ইন্টারনেট ক্লাউড সার্ভারের মধ্যে প্যাকেট আদান-প্রদান এবং লাইভ প্যাকেট অ্যানালাইসিস।',
      summaryEn: 'Real-time network traffic dashboard showing live packets flowing across topology nodes, threat detections, and metrics.',
      howToUseBn: [
        'উপরের নেভিগেশন বারে "Pause" ও "Live Stream" বাটন দিয়ে প্যাকেট ট্রাফিকের গতি নিয়ন্ত্রণ করুন।',
        'টপোলজি ডায়াগ্রামে প্যাকেটগুলো কীভাবে ক্লায়েন্ট থেকে রাউটার এবং সার্ভারে পৌঁছাচ্ছে তা লাইভ দেখুন।',
        'নিচের লাইভ প্যাকেট লগে প্রতিটি প্যাকেটের প্রোটোকল (HTTPS, DNS, SSH, ICMP), সোর্স/ডেস্টিনেশন আইপি এবং স্ট্যাটাস দেখুন।',
        'কোনো প্যাকেট লাল রঙে "DROPPED" হলে বুঝবেন ফায়ারওয়াল বা সিকিউরিটি পলিসি তা ড্রপ করেছে।'
      ],
      howToUseEn: [
        'Use the Pause / Live Stream button in the top bar to pause or resume packet flow.',
        'Watch simulated packets traverse client devices, the edge gateway, and cloud servers.',
        'Review the live packet stream table below for protocol, IP pair, latency, and status.',
        'Red DROPPED rows indicate threats intercepted by the firewall engine.'
      ],
      keyFeaturesBn: [
        'প্রতি সেকেন্ডে লাইভ প্যাকেট জেনারেশন ও ব্যান্ডউইথ ট্র্যাকিং',
        'ইন্টারেক্টিভ নেটওয়ার্ক টপোলজি নোড ও লিঙ্ক',
        'মালিশিয়াস প্যাকেট ডিটেকশন ও ড্রপ অ্যালার্ট'
      ],
      keyFeaturesEn: [
        'Live packets per second and bandwidth monitoring',
        'Interactive network topology canvas',
        'Malicious probe detection and security drop logs'
      ],
      proTipBn: 'টিপ: ট্রাফিক সাময়িকভাবে থামাতে উপরে থাকা "Pause" বাটনে ক্লিক করুন, যাতে কোনো নির্দিষ্ট প্যাকেট শান্তভাবে অ্যানালাইসিস করতে পারেন।'
    },
    {
      id: 'ip',
      tabId: 'ip',
      titleBn: 'আইপি অ্যাড্রেস ও সাবনেটিং টুল (IP & Subnetting Calculator)',
      titleEn: 'IP & Subnetting Calculator',
      category: 'core',
      icon: Binary,
      badgeBn: 'সাবনেট ক্যালকুলেটর',
      badgeEn: 'Subnetting Tool',
      summaryBn: 'IPv4 সাবনেটিং (CIDR /8 থেকে /32), নেটওয়ার্ক ও ব্রডকাস্ট আইপি, ব্যবহারযোগ্য হোস্ট রেঞ্জ এবং IPv6 টুল।',
      summaryEn: 'Comprehensive IPv4 CIDR calculator with binary visualization and IPv6 compression / expansion tools.',
      howToUseBn: [
        'যেকোনো IPv4 ঠিকানা ইনপুট দিন (যেমন: 192.168.1.10 বা 10.0.0.1)।',
        'CIDR স্লাইডার বা ড্রপডাউন থেকে প্রিফিক্স সিলেক্ট করুন (যেমন: /24, /26, /30)।',
        'সাথে সাথে সাবনেট মাস্ক, নেটওয়ার্ক আইডি, ব্রডকাস্ট আইডি ও হোস্ট সংখ্যা দেখুন।',
        '"Binary View" টগল করে আইপির অক্টেটগুলো কীভাবে বিট আকারে থাকে তা দেখুন।',
        'IPv6 ট্যাবে গিয়ে বড় IPv6 অ্যাড্রেস ছোট (Compress) ও বড় (Expand) করার নিয়ম শিখুন।'
      ],
      howToUseEn: [
        'Enter any IPv4 address (e.g. 192.168.1.50 or 172.16.0.1).',
        'Adjust the CIDR slider or dropdown (e.g. /24, /27, /30).',
        'Instantly view the calculated Subnet Mask, Network Address, Broadcast Address, and Usable Host Range.',
        'Toggle Binary View to see octet bit transitions.',
        'Switch to IPv6 tab to practice address compression and expansion.'
      ],
      keyFeaturesBn: [
        'রিয়েল-টাইম ইনস্ট্যান্ট সাবনেট ক্যালকুলেশন',
        'বাইনারি ও ডেসিমাল পাশাপাশি প্রদর্শন',
        'IPv6 কম্প্রেশন ও রুলস চেকার'
      ],
      keyFeaturesEn: [
        'Instant real-time subnet calculation',
        'Side-by-side decimal and binary representation',
        'IPv6 RFC 5952 compression rules'
      ],
      proTipBn: 'টিপ: পয়েন্ট-টু-পয়েন্ট রাউটার লিঙ্কের জন্য সাধারণত /30 (২টি ব্যবহারযোগ্য আইপি) অথবা /31 ব্যবহার করা হয়।'
    },
    {
      id: 'headers',
      tabId: 'headers',
      titleBn: 'প্যাকেট হেডার ইন্স্পেক্টর (Wireshark-Style Inspector)',
      titleEn: 'Packet Header Dissector',
      category: 'core',
      icon: FileCode,
      badgeBn: 'প্যাকেট স্ট্রাকচার',
      badgeEn: 'Header Dissector',
      summaryBn: 'Ethernet II, IPv4, IPv6, TCP, UDP এবং ICMP ফ্রেমের প্রতিটি বাইট, বিট এবং ফ্ল্যাগ ফিল্ড বিশ্লেষণ করার ল্যাব।',
      summaryEn: 'Deep-dive packet dissector showing byte offsets, fields, flags (SYN, ACK, FIN), checksums, and protocols.',
      howToUseBn: [
        'উপরে থাকা ট্যাব থেকে প্রোটোকল সিলেক্ট করুন (Ethernet, IPv4, IPv6, TCP, UDP, ICMP)।',
        'কালার-কোডেড হেডার গ্রিডে যেকোনো ফিল্ডে (যেমন TTL, Checksum, Window Size, Sequence Number) ক্লিক করুন।',
        'নিচে ফিল্ডটির আকার (Bits/Bytes), এর কাজ এবং সিকিউরিটি গুরুত্বের বাংলা বিবরণ পড়ুন।'
      ],
      howToUseEn: [
        'Choose a protocol tab: Ethernet II, IPv4, IPv6, TCP, UDP, or ICMP.',
        'Click on any color-coded field (e.g., TTL, Checksum, Flags, Source Port).',
        'Read the detailed explanation below regarding field purpose, bit width, and security relevance.'
      ],
      keyFeaturesBn: [
        'Wireshark এর মতো বাইট লেভেল হেডার ম্যাপিং',
        'টিসিপি ফ্ল্যাগস (SYN, ACK, FIN, RST, PSH, URG) এর কার্যপদ্ধতি',
        'হেক্সাডেসিমাল ও বাইনারি ইন্টারপ্রেটেশন'
      ],
      keyFeaturesEn: [
        'Wireshark-style interactive byte visualizer',
        'Detailed TCP flags explorer',
        'Security-relevant checksum and TTL explanations'
      ],
      proTipBn: 'টিপ: আইপি প্যাকেটের TTL (Time to Live) মান রাউটার অতিক্রম করার সাথে সাথে ১ করে কমে যায়, যা রাউটিং লুপ রোধ করে।'
    },
    {
      id: 'firewall',
      tabId: 'firewall',
      titleBn: 'ফায়ারওয়াল ও IDS/IPS সিমুলেটর (Firewall & IDS/IPS)',
      titleEn: 'Firewall & IDS/IPS Engine',
      category: 'security',
      icon: ShieldAlert,
      badgeBn: 'নেটওয়ার্ক সিকিউরিটি',
      badgeEn: 'Network Defense',
      summaryBn: 'কাস্টম ফায়ারওয়াল রুল তৈরি করে ট্রাফিক ফিল্টার করা এবং সাইবার অ্যাটাক (যেমন টেলনেট স্ক্যান, SYN ফ্লাড) প্রতিরোধ পরীক্ষা।',
      summaryEn: 'Interactive stateful firewall ACL simulator with custom rules, live threat triggers, and intrusion detection logs.',
      howToUseBn: [
        '"Add Rule" বোতামে ক্লিক করে নতুন রুল তৈরি করুন (Action: ALLOW বা DROP, Protocol, Source IP, Destination Port)।',
        'রুলগুলো ড্র্যাগ বা টগল করে অন/অফ করতে পারেন।',
        'নিচে থাকা "Simulate Attack" (যেমন Telnet Probe, Port Scan) বাটনে চাপ দিয়ে দেখুন আপনার ফায়ারওয়াল রুল কীভাবে আক্রমণ আটকে দেয়।',
        'IDS/IPS সিগনেচার ট্যাবে গিয়ে ক্ষতিকর ট্রাফিকের প্যাটার্ন ম্যাচিং দেখুন।'
      ],
      howToUseEn: [
        'Click "Add Rule" to configure an Access Control List (ACL) with ALLOW, DROP, or REJECT actions.',
        'Toggle rules on and off to observe impact on passing traffic.',
        'Click simulated attack buttons (e.g. Telnet probe, Malicious SMB) to verify defense.',
        'Check the IDS/IPS signatures tab to inspect pattern-based threat alerts.'
      ],
      keyFeaturesBn: [
        'কাস্টম ACL রুল ইঞ্জিন ও প্রায়োরিটি অর্ডারিং',
        'লাইভ অ্যাটাক টেস্ট ও প্যাকেট ড্রপ মেট্রিক্স',
        'ইনট্রুশন ডিটেকশন সিগনেচার ডাটাবেস'
      ],
      keyFeaturesEn: [
        'Custom firewall rule builder with hit counters',
        'One-click threat simulation engine',
        'IDS/IPS signature rule triggers'
      ],
      proTipBn: 'টিপ: ফায়ারওয়াল রুল সবসময় ওপর থেকে নিচে ক্রমানুসারে কার্যকর হয় (Top-to-Bottom evaluation)।'
    },
    {
      id: 'portforward',
      tabId: 'portforward',
      titleBn: 'পোর্ট ফরোয়ার্ডিং ও NAT ল্যাব (Port Forwarding & NAT)',
      titleEn: 'Port Forwarding & NAT Lab',
      category: 'labs',
      icon: Share2,
      badgeBn: 'রাউটার কনফিগারেশন',
      badgeEn: 'Router & Gateway',
      summaryBn: 'পাবলিক আইপি থেকে লোকাল ল্যান সার্ভারে (Web, SSH, Game Server) কীভাবে ট্রাফিক ফরোয়ার্ড হয় তা শেখার হ্যান্ডস-অন ল্যাব।',
      summaryEn: 'Visualizer for Network Address Translation (NAT) and Port Address Translation (PAT) from WAN to LAN.',
      howToUseBn: [
        'রুল লিস্ট থেকে পোর্ট ফরোয়ার্ডিং রুল চালু বা বন্ধ করুন (যেমন: WAN Port 80 ➔ LAN 192.168.1.50:80)।',
        '"Send Inbound Traffic" বাটনে ক্লিক করে প্যাকেটের যাত্রা লক্ষ্য করুন।',
        'রাউটার কীভাবে পাবলিক আইপি ও পোর্টের সাথে লোকাল আইপির ম্যাপিং করে তা অ্যানিমেশনে দেখুন।'
      ],
      howToUseEn: [
        'Toggle rules for Web (80/443), SSH (22), or Custom gaming servers.',
        'Click "Send Inbound Traffic" to trigger an external client packet.',
        'Observe how the router NAT table translates public WAN traffic into private LAN packets.'
      ],
      keyFeaturesBn: [
        'WAN থেকে LAN প্যাকেট ট্রান্সলেশন ভিজ্যুয়াল',
        'পোর্ট কনফ্লিক্ট প্রিভেনশন ও হিট কাউন্টার',
        'বাস্তব রাউটার কনফিগারেশনের আদলে তৈরি'
      ],
      keyFeaturesEn: [
        'Visual WAN-to-LAN translation flow',
        'Hit counters and status diagnostics',
        'Matches real-world router admin portals'
      ],
      proTipBn: 'টিপ: হোম ব্রডব্যান্ডে স্ট্যাটিক পাবলিক আইপি না থাকলে বা CGNAT থাকলে সাধারণ পোর্ট ফরোয়ার্ডিং কাজ করে না, তখন VPN বা Cloudflare Tunnel দরকার হয়।'
    },
    {
      id: 'tcpudp',
      tabId: 'tcpudp',
      titleBn: 'TCP/UDP হ্যান্ডশেক ও সকেট মনিটর (TCP/UDP Monitor)',
      titleEn: 'TCP/UDP Handshake & Sockets',
      category: 'core',
      icon: Cpu,
      badgeBn: 'ট্রান্সপোর্ট লেয়ার',
      badgeEn: 'Transport Layer',
      summaryBn: 'টিসিপির বিখ্যাত ৩-ওয়ে হ্যান্ডশেক (SYN ➔ SYN-ACK ➔ ACK) এবং ৪-ওয়ে কানেকশন ক্লোজিং প্রক্রিয়া ধাপে ধাপে বোঝার ল্যাব।',
      summaryEn: 'Step-by-step TCP 3-way handshake animator, 4-way termination, and active socket state inspector.',
      howToUseBn: [
        '"Next Handshake Step" বাটনে চাপ দিয়ে ধাপে ধাপে SYN, SYN-ACK এবং ACK প্যাকেট প্রবাহ দেখুন।',
        'ক্লায়েন্ট এবং সার্ভারের কানেকশন স্টেট কীভাবে CLOSED থেকে LISTEN এবং ESTABLISHED হয় তা দেখুন।',
        'কানেকশন সকেট ট্যাবে গিয়ে পিসির সক্রিয় নেটওয়ার্ক সকেট ও RTT ল্যাটেন্সি দেখুন।'
      ],
      howToUseEn: [
        'Click "Next Step" to advance the 3-Way Handshake step by step.',
        'Watch client and server states transition: CLOSED ➔ SYN_SENT ➔ SYN_RECEIVED ➔ ESTABLISHED.',
        'Switch to the active connections tab to view open TCP/UDP sockets and RTT latency.'
      ],
      keyFeaturesBn: [
        'স্টেপ-বাই-স্টেপ অ্যানিমেটেড হ্যান্ডশেক',
        'সিকোয়েন্স ও অ্যাকনলেজমেন্ট নম্বর হিসাব',
        'TCP বনাম UDP তুলনা গাইড'
      ],
      keyFeaturesEn: [
        'Step-by-step animated handshake sequence',
        'Sequence and acknowledgment number math',
        'Interactive TCP vs UDP comparison'
      ],
      proTipBn: 'টিপ: TCP নির্ভরযোগ্য কারণ এতে প্যাকেটের প্রাপ্তি নিশ্চিত করা হয় (ACK), অন্যদিকে UDP দ্রুত কিন্তু প্যাকেট ডেলিভারির নিশ্চয়তা দেয় না।'
    },
    {
      id: 'ping',
      tabId: 'ping',
      titleBn: 'পিং ও ICMP ডায়াগনস্টিক (Ping & ICMP Inspector)',
      titleEn: 'Ping & ICMP Diagnostics',
      category: 'labs',
      icon: Activity,
      badgeBn: 'ডায়াগনস্টিক টুল',
      badgeEn: 'Diagnostic Tool',
      summaryBn: 'ICMP Echo Request ও Reply প্যাকেট, RTT ল্যাটেন্সি, প্যাকেট লস এবং TTL ক্ষয় পর্যবেক্ষণ করার ভিজ্যুয়াল টুল।',
      summaryEn: 'Visual ICMP ping tool tracking packet transit, round-trip time (RTT), TTL decrement, and jitter.',
      howToUseBn: [
        'টার্গেট আইপি বা ডোমেইন সিলেক্ট করুন (যেমন: 8.8.8.8, 1.1.1.1, Local Gateway)।',
        '"Send Ping Sequence" বোতামে চাপ দিন।',
        'প্যাকেট ট্রান্সমিশন অ্যানিমেশন, RTT চার্ট এবং রেসপন্স টাইম লক্ষ্য করুন।'
      ],
      howToUseEn: [
        'Select or enter a target IP (e.g. 8.8.8.8, 1.1.1.1, or local router).',
        'Click "Send Ping Sequence".',
        'Watch the packet travel to the host and return, graphing RTT and packet loss.'
      ],
      keyFeaturesBn: [
        'রিয়েল-টাইম RTT গ্রাফ ও ল্যাটেন্সি ক্যালকুলেশন',
        'ICMP Type 8 (Echo Request) ও Type 0 (Echo Reply) ডিটেইলস',
        'প্যাকেট ড্রপ ও টাইমআউট সিমুলেশন'
      ],
      keyFeaturesEn: [
        'Real-time RTT graph and latency calculation',
        'ICMP Type 8 (Request) and Type 0 (Reply) packet inspect',
        'Simulated timeout and network jitter'
      ],
      proTipBn: 'টিপ: পিং রেসপন্সে TTL মান দেখে অপারেটিং সিস্টেম অনুমান করা যায় (সাধারণত লিনাক্সে TTL=64 এবং উইন্ডোজে TTL=128 হয়)।'
    },
    {
      id: 'mac_spoof',
      tabId: 'mac_spoof',
      titleBn: 'ম্যাক অ্যাড্রেস ও স্পুফিং (MAC & Spoofing Lab)',
      titleEn: 'MAC Address & Spoofing Lab',
      category: 'security',
      icon: Cpu,
      badgeBn: 'লেয়ার ২ সিকিউরিটি',
      badgeEn: 'Layer 2 Security',
      summaryBn: 'MAC অ্যাড্রেসের গঠন (OUI ভেন্ডর কোড + NIC সিরিয়াল), কীভাবে হ্যাকাররা ম্যাক স্পুফিং করে এবং তা প্রতিরোধ করার উপায়।',
      summaryEn: 'Explore MAC address structure, OUI lookup, MAC address cloning/spoofing, and port security mitigation.',
      howToUseBn: [
        'ম্যাক অ্যাড্রেস ডিকোডারে যেকোনো ম্যাক অ্যাড্রেস দিয়ে তার নির্মাতা ভেন্ডর ও ইউনিক আইডি পরীক্ষা করুন।',
        'স্পুফিং ট্যাবে গিয়ে কীভাবে অ্যাটাকার ভিক্টিমের ম্যাক কপি করে ওয়াইফাই ফিল্টারিং বাইপাস করে তা অ্যানিমেশনে দেখুন।',
        'সুইচে "Port Security" এবং "DHCP Snooping" কীভাবে স্পুফিং রোধ করে তা শিখুন।'
      ],
      howToUseEn: [
        'Use the MAC decoder to break down OUI vendor prefixes and NIC identifiers.',
        'Test the MAC spoofing simulation to see how attackers bypass MAC address filters.',
        'Explore defensive remedies: Switch Port Security and 802.1X Network Access Control.'
      ],
      keyFeaturesBn: [
        'OUI ভেন্ডর প্রিফিক্স লুকআপ',
        'ইন্টারেক্টিভ স্পুফিং অ্যাটাক ডেমো',
        'সুইচ পোর্ট সিকিউরিটি কনফিগারেশন গাইড'
      ],
      keyFeaturesEn: [
        'OUI vendor database lookup',
        'Interactive spoofing bypass demo',
        'Switch port security remediation instructions'
      ],
      proTipBn: 'টিপ: ম্যাক অ্যাড্রেস শুধুমাত্র একই লোকাল নেটওয়ার্কে (LAN) দৃশ্যমান থাকে; ইন্টারনেটে রাউটার পার হলে সোর্স ম্যাক রাউটারের ম্যাকে পরিবর্তিত হয়।'
    },
    {
      id: 'hotspot_conflict',
      tabId: 'hotspot_conflict',
      titleBn: 'হটস্পট একই আইপি ও কনফ্লিক্ট ল্যাব (Hotspot IP Conflict)',
      titleEn: 'Hotspot IP & Conflict Lab',
      category: 'labs',
      icon: Radio,
      badgeBn: 'ট্রাবলশুটিং ল্যাব',
      badgeEn: 'Troubleshooting Lab',
      summaryBn: 'মোবাইল হটস্পট বা ওয়াইফাই নেটওয়ার্কে দুটি ডিভাইসে ভুলবশত একই আইপি সেট করলে কী ঘটে এবং কীভাবে সমাধান করতে হয়।',
      summaryEn: 'Simulate IP address collision in a hotspot/Wi-Fi network, gratuitous ARP loops, and DHCP resolution.',
      howToUseBn: [
        'দুটি ক্লায়েন্ট ডিভাইসে একই স্ট্যাটিক আইপি (যেমন: 192.168.43.15) অ্যাসাইন করুন।',
        '"Trigger IP Conflict" চাপুন এবং নেটওয়ার্কের সংযোগ বিচ্ছিন্ন হওয়া দেখুন।',
        'Gratuitous ARP মেসেজ আদান-প্রদান এবং সিস্টেম এরর লক্ষ্য করুন।',
        '"Auto-Resolve" বোতাম চেপে রাউটার DHCP থেকে নতুন আইপি নিয়ে স্বাভাবিক অবস্থায় ফিরিয়ে আনুন।'
      ],
      howToUseEn: [
        'Assign the same static IP to two client devices on the subnet.',
        'Click "Trigger IP Conflict" to see ARP collisions and connection dropouts.',
        'Inspect Gratuitous ARP broadcast packets announcing duplicate ownership.',
        'Click "Auto-Resolve" to obtain clean DHCP leases and restore connectivity.'
      ],
      keyFeaturesBn: [
        'ডুপ্লিকেট আইপি কোলাইশন ভিজ্যুয়ালাইজেশন',
        'ARP টেবিল করাপশন ডেমো',
        'এক ক্লিকে DHCP রিকনফিগারেশন সমাধান'
      ],
      keyFeaturesEn: [
        'Duplicate IP collision visualization',
        'ARP table corruption simulation',
        'One-click DHCP re-lease remedy'
      ],
      proTipBn: 'টিপ: আইপি কনফ্লিক্ট এড়াতে সবসময় নেটওয়ার্কে DHCP সার্ভারের পুলের বাইরের আইপিগুলোকে স্ট্যাটিক হিসেবে ব্যবহার করতে হয়।'
    },
    {
      id: 'net_types',
      tabId: 'net_types',
      titleBn: 'নেটওয়ার্ক টাইপস (PAN, LAN, MAN, WAN)',
      titleEn: 'Network Types (PAN, LAN, MAN, WAN)',
      category: 'core',
      icon: Network,
      badgeBn: 'থিওরি ও গাইড',
      badgeEn: 'Theory & Overview',
      summaryBn: 'ভৌগোলিক পরিধি ও প্রয়োগের ওপর ভিত্তি করে পার্সোনাল (PAN), লোকাল (LAN), মেট্রোপলিটন (MAN) এবং ওয়াইড এরিয়া নেটওয়ার্ক (WAN)-এর পূর্ণাঙ্গ চিত্র।',
      summaryEn: 'Comprehensive guide covering Personal, Local, Metropolitan, and Wide Area Networks with real-world comparisons.',
      howToUseBn: [
        'PAN, LAN, MAN, WAN ক্যাটাগরিতে ক্লিক করে তাদের কভারেজ রেঞ্জ, স্পিড ও ব্যবহৃত ডিভাইস দেখুন।',
        'বাস্তব জীবনের উদাহরণ ও টপোলজি ডায়াগ্রামের মাধ্যমে পার্থক্যটি সহজে বুঝে নিন।'
      ],
      howToUseEn: [
        'Switch between PAN, LAN, MAN, and WAN tabs.',
        'Compare geographical span, typical transmission mediums, bandwidth speeds, and equipment.'
      ],
      keyFeaturesBn: [
        'তুলনামূলক মেট্রিক্স টেবিল',
        'বাস্তব হার্ডওয়্যার ও আর্কিটেকচার উদাহরণ',
        'সহজ ও প্রাঞ্জল উপস্থাপনা'
      ],
      keyFeaturesEn: [
        'Comparative metrics matrix',
        'Real-world hardware topology diagrams',
        'Clear terminology breakdown'
      ],
      proTipBn: 'টিপ: আপনার ব্লুটুথ হেডফোন হল PAN, বাসা বা অফিসের ওয়াইফাই হল LAN, আর সারা পৃথিবী জুড়ে বিস্তৃত ইন্টারনেট হলো WAN।'
    },
    {
      id: 'protocols',
      tabId: 'protocols',
      titleBn: 'পোর্টস ও প্রোটোকলস ডিরেক্টরি (Ports & Protocols Directory)',
      titleEn: 'Ports & Protocols Directory',
      category: 'tools',
      icon: Radio,
      badgeBn: 'পোর্ট এনসাইক্লোপিডিয়া',
      badgeEn: 'Port Reference',
      summaryBn: 'HTTP (80), HTTPS (443), SSH (22), DNS (53), DHCP (67/68) সহ সমস্ত পরিচিত নেটওয়ার্ক পোর্ট ও প্রোটোকলের সার্চেবল ডাটাবেস।',
      summaryEn: 'Searchable directory of well-known and registered ports with OSI layer, transport type, and security notes.',
      howToUseBn: [
        'সার্চ বারে যেকোনো পোর্ট নম্বর (যেমন: 443, 22) বা প্রোটোকলের নাম লিখুন।',
        'ক্যাটাগরি (Web, Security, Database, Infrastructure) অনুযায়ী ব্রাউজ করুন।',
        'প্রতিটি প্রোটোকলের সিকিউরিটি নোট পড়ুন (যেমন: Telnet কেন ক্ষতিকর এবং কেন SSH ব্যবহার করা উচিত)।'
      ],
      howToUseEn: [
        'Search by port number (e.g. 443, 22, 53) or service name.',
        'Filter by category: Web, Database, Infrastructure, or Remote Access.',
        'Review security considerations explaining why unencrypted legacy ports must be secured.'
      ],
      keyFeaturesBn: [
        'দ্রুত ইনস্ট্যান্ট সার্চ ও ফিল্টারিং',
        'TCP বনাম UDP ট্রান্সপোর্ট লেভেল আইডেন্টিফিকেশন',
        'সাইবার সিকিউরিটি প্র্যাকটিস নোট'
      ],
      keyFeaturesEn: [
        'Instant search and category filtering',
        'Transport protocol and OSI layer tags',
        'Actionable cyber defense notes'
      ],
      proTipBn: 'টিপ: পোর্ট ০ থেকে ১০২৩ পর্যন্ত পোর্টগুলোকে বলা হয় "Well-Known Ports", যা সাধারণত অপারেটিং সিস্টেমের বিশেষ সার্ভিসের জন্য সংরক্ষিত থাকে।'
    }
  ];

  const faqs = [
    {
      qBn: 'এই ওয়েবসাইটটি (NetSim Pro) কী এবং কার জন্য তৈরি?',
      qEn: 'What is NetSim Pro and who is it built for?',
      aBn: 'NetSim Pro হলো একটি সম্পূর্ণ ব্রাউজার-বেসড ইন্টার-অ্যাক্টিভ নেটওয়ার্কিং ও সাইবার সিকিউরিটি সিমুলেটর। কম্পিউটার সায়েন্সের শিক্ষার্থী, নেটওয়ার্ক ইঞ্জিনিয়ার, সিসঅ্যাডমিন, ইথিক্যাল হ্যাকার বা যেকোনো কৌতূহলী প্রযুক্তিপ্রেমীর জন্য প্র্যাকটিক্যাল পরীক্ষার ল্যাব হিসেবে এটি ডিজাইন করা হয়েছে।',
      aEn: 'NetSim Pro is an interactive browser-based networking and cyber defense simulator designed for students, sysadmins, network engineers, and ethical hackers.'
    },
    {
      qBn: 'কোনো সফটওয়্যার বা টার্মিনাল ইনস্টল করার প্রয়োজন আছে কি?',
      qEn: 'Do I need to install any external software or virtual machine?',
      aBn: 'একদমই না! সম্পূর্ণ সিস্টেমটি আপনার ব্রাউজারেই ১০০% স্বয়ংক্রিয়ভাবে স্যান্ডবক্স হিসেবে চলে। লিনাক্স কমান্ড প্র্যাকটিস থেকে শুরু করে ফায়ারওয়াল রুল টেস্ট—সবকিছুই কোনো সেটআপ ছাড়াই সরাসরি ব্যবহার করা যায়।',
      aEn: 'No installation required! The entire engine runs in your browser sandbox, including the simulated Linux terminal, firewall filters, and OSI visualizer.'
    },
    {
      qBn: 'আমি একজন নতুন শিক্ষার্থী। আমি কোথা থেকে শুরু করব?',
      qEn: 'I am a beginner. Where should I start first?',
      aBn: 'প্রথমেই "OSI 7 Layers" ট্যাবে যান এবং কীভাবে ডেটা প্রেরিত হয় তা দেখুন। এরপর "IP & Subnetting" এ গিয়ে আইপি ও সাবনেট মাস্ক বুঝুন। এরপর "Linux Handbook" ও "Terminal Practice Lab"-এ কিছু বেসিক কমান্ড প্র্যাকটিস করুন।',
      aEn: 'Start with the OSI 7 Layers simulator to understand data encapsulation. Then explore IP & Subnetting, followed by the Linux Handbook and Terminal Practice Lab.'
    },
    {
      qBn: 'সাইবার সিকিউরিটি টুলসের কমান্ডগুলো কি টার্মিনালে সরাসরি রান করা যায়?',
      qEn: 'Can cyber security commands be directly executed in the practice lab?',
      aBn: 'হ্যাঁ! "Cyber Security Tools" ট্যাবে প্রতিটি টুলের নিচে থাকা "টার্মিনালে পাঠান" (Send to Terminal) বাটনে ক্লিক করলেই কমান্ডটি সরাসরি টার্মিনাল প্র্যাকটিস ল্যাবে চলে যাবে এবং রান করতে পারবেন।',
      aEn: 'Yes! Every command in the Cyber Security Guide features a "Send to Terminal" button that immediately loads the command into the interactive Linux terminal.'
    },
    {
      qBn: 'লাইভ ট্রাফিক কীভাবে নিয়ন্ত্রণ করব?',
      qEn: 'How do I control the live background packet engine?',
      aBn: 'স্ক্রিনের উপরের নাবার (Navbar)-এ একটি "Pause / Live Stream" বাটন রয়েছে। যেকোনো সময় ট্রাফিক থামাতে "Pause" চাপুন এবং পুনরায় চালাতে "Live Stream" চাপুন।',
      aEn: 'Use the Pause / Live Stream toggle button in the top navigation bar to halt or resume background synthetic packet generation.'
    },
    {
      qBn: 'ভাষা (Language) পরিবর্তন করার নিয়ম কী?',
      qEn: 'How do I switch languages between Bengali and English?',
      aBn: 'উপরে ডানদিকের "বাংলা / English" বাটনে ক্লিক করুন। এক ক্লিকেই সম্পূর্ণ ওয়েবসাইটের কনটেন্ট ও মেন্যু বাংলা বা ইংরেজিতে টগল হবে।',
      aEn: 'Click the "English / বাংলা" button on the top right of the navigation bar to toggle the UI language instantly.'
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchCategory;

    const matchText = 
      guide.titleBn.toLowerCase().includes(query) ||
      guide.titleEn.toLowerCase().includes(query) ||
      guide.summaryBn.toLowerCase().includes(query) ||
      guide.summaryEn.toLowerCase().includes(query) ||
      guide.howToUseBn.some(step => step.toLowerCase().includes(query)) ||
      guide.keyFeaturesBn.some(feat => feat.toLowerCase().includes(query));

    return matchCategory && matchText;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'User Manual & Guide' : 'পূর্ণাঙ্গ ব্যবহার নির্দেশিকা ও ম্যানুয়াল'}</span>
            </span>
            <span className="text-xs text-slate-400">
              {lang === 'en' ? 'For NetSim Pro v2.4 • Step-by-Step' : 'NetSim Pro v2.4 • ধাপে ধাপে ব্যবহারবিধি'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'en' 
              ? 'How to Use NetSim Pro: Complete User Manual'
              : 'কীভাবে NetSim Pro ব্যবহার করবেন: সম্পূর্ণ বাংলা ইউজার ম্যানুয়াল'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {lang === 'en'
              ? 'NetSim Pro is an interactive, browser-based sandbox for mastering networking, cyber defense, the OSI model, packet analysis, and Linux terminal operations. Here is your definitive guide to every feature and tool.'
              : 'NetSim Pro হলো নেটওয়ার্কিং, সাইবার সিকিউরিটি, ওএসআই ৭-লেয়ার মডেল, প্যাকেট বিশ্লেষণ এবং লিনাক্স টার্মিনাল প্র্যাকটিস করার একটি সম্পূর্ণ স্যান্ডবক্স। এই নির্দেশিকায় প্রতিটি টুল কীভাবে ব্যবহার করবেন তার বিস্তারিত বিবরণ তুলে ধরা হয়েছে।'}
          </p>

          {/* 3 Quick-Start Steps Banner */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-300 text-[11px]">১</span>
                <span>{lang === 'en' ? 'Explore OSI & Traffic' : '১. ওএসআই ও লাইভ ট্রাফিক'}</span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'en'
                  ? 'Watch real packet encapsulation and network nodes in real-time.'
                  : 'ওএসআই মডেল ও লাইভ ম্যাপে প্যাকেট আদান-প্রদান পর্যবেক্ষণ করুন।'}
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-950 border border-blue-700 flex items-center justify-center text-blue-300 text-[11px]">২</span>
                <span>{lang === 'en' ? 'Inspect Packets & Subnet' : '২. সাবনেটিং ও হেডার বিশ্লেষণ'}</span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'en'
                  ? 'Calculate IPv4/IPv6 CIDR ranges and dissect raw packet headers.'
                  : 'আইপি ক্যালকুলেট করুন এবং ওয়্যারশার্ক স্টাইলে হেডার বাইট পরীক্ষা করুন।'}
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-300 text-[11px]">৩</span>
                <span>{lang === 'en' ? 'Practice Linux & Defense' : '৩. সিকিউরিটি ও টার্মিনাল ল্যাব'}</span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'en'
                  ? 'Test Nmap, Wireshark commands in the terminal and configure firewalls.'
                  : 'টার্মিনাল ল্যাবে সরাসরি কমান্ড রান করুন এবং ফায়ারওয়াল রুল তৈরি করুন।'}
              </p>
            </div>
          </div>
        </div>

        {/* Ambient subtle glow background */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900/60 p-3 sm:p-4 rounded-xl border border-slate-800">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Search manual (e.g. subnetting, terminal, firewall, OSI, ping, MAC)...'
                : 'ম্যানুয়াল সার্চ করুন (যেমন: সাবনেটিং, টার্মিনাল, ফায়ারওয়াল, ওএসআই, পিং, ম্যাক)...'
            }
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', labelBn: 'সবগুলো', labelEn: 'All' },
            { id: 'core', labelBn: 'নেটওয়ার্ক বেসিক', labelEn: 'Core' },
            { id: 'security', labelBn: 'সাইবার ডিফেন্স', labelEn: 'Security' },
            { id: 'tools', labelBn: 'লিনাক্স ও টুলস', labelEn: 'Tools & Linux' },
            { id: 'labs', labelBn: 'হ্যান্ডস-অন ল্যাব', labelEn: 'Labs' },
            { id: 'faq', labelBn: 'প্রশ্নোত্তর (FAQ)', labelEn: 'FAQ' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelBn}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Cards or FAQ */}
      {selectedCategory === 'faq' ? (
        /* FAQ Section */
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-lg pb-1 border-b border-slate-800">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h2>{lang === 'en' ? 'Frequently Asked Questions (FAQ)' : 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-2.5 transition hover:border-slate-700"
              >
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-cyan-950 border border-cyan-800/80 text-cyan-300 text-xs font-bold flex items-center justify-center">
                    Q
                  </span>
                  <h3 className="font-semibold text-sm text-slate-100">
                    {lang === 'en' ? faq.qEn : faq.qBn}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-8">
                  {lang === 'en' ? faq.aEn : faq.aBn}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Module Guides Grid */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-slate-300 pb-1 border-b border-slate-800">
            <div className="flex items-center gap-2 font-semibold text-base sm:text-lg">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h2>
                {lang === 'en' ? 'Module Guides & Instructions' : 'টুলভিত্তিক ব্যবহারের বিস্তারিত নিয়মাবলি'}
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              {lang === 'en' 
                ? `Showing ${filteredGuides.length} modules` 
                : `${filteredGuides.length}টি মডিউলের গাইড`}
            </span>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 space-y-3">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-400">
                {lang === 'en' ? 'No guides found matching your search.' : 'আপনার অনুসন্ধানের সাথে মিল রেখে কোনো গাইড পাওয়া যায়নি।'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-cyan-400 hover:underline"
              >
                {lang === 'en' ? 'Reset search filter' : 'সার্চ ফিল্টার রিসেট করুন'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGuides.map((guide) => {
                const Icon = guide.icon;
                const isExpanded = expandedSection === guide.id;

                return (
                  <div
                    key={guide.id}
                    className={`rounded-xl border transition-all duration-200 ${
                      isExpanded
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Header bar of the card */}
                    <div 
                      onClick={() => setExpandedSection(isExpanded ? null : guide.id)}
                      className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-sm sm:text-base text-slate-100">
                              {lang === 'en' ? guide.titleEn : guide.titleBn}
                            </h3>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                              {lang === 'en' ? guide.badgeEn : guide.badgeBn}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 sm:line-clamp-none">
                            {lang === 'en' ? guide.summaryEn : guide.summaryBn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quick Direct Jump Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateTab(guide.tabId);
                          }}
                          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition"
                          title={lang === 'en' ? `Open ${guide.titleEn}` : `${guide.titleBn}-এ যান`}
                        >
                          <span>{lang === 'en' ? 'Open Tool' : 'টুলে যান'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button 
                          type="button"
                          className="p-1.5 rounded-md text-slate-400 hover:text-slate-200"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Detail Body */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-4 text-slate-300 text-xs sm:text-sm">
                        {/* How to use */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-xs tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'How to Use Step-by-Step' : 'কীভাবে ব্যবহার করবেন (ধাপে ধাপে)'}</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {(lang === 'en' ? guide.howToUseEn : guide.howToUseBn).map((step, idx) => (
                              <div 
                                key={idx} 
                                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60"
                              >
                                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-700/60 text-cyan-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="text-xs text-slate-300 leading-relaxed">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Features & Pro Tip */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 space-y-1.5">
                            <h5 className="font-semibold text-xs text-slate-200 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              <span>{lang === 'en' ? 'Key Features' : 'মূল সুবিধা ও বৈশিষ্ট্য'}</span>
                            </h5>
                            <ul className="space-y-1 text-xs text-slate-400">
                              {(lang === 'en' ? guide.keyFeaturesEn : guide.keyFeaturesBn).map((feat, fidx) => (
                                <li key={fidx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 space-y-1.5">
                            <h5 className="font-semibold text-xs text-slate-200 flex items-center gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{lang === 'en' ? 'Pro Tip' : 'প্রো টিপ'}</span>
                            </h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {lang === 'en' ? (guide.proTipEn || guide.proTipBn) : guide.proTipBn}
                            </p>
                          </div>
                        </div>

                        {/* Sample Command if applicable */}
                        {guide.sampleCommand && (
                          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Terminal className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs text-slate-400">
                                {lang === 'en' ? 'Try sample command:' : 'নমুনা কমান্ড পরীক্ষা করুন:'}
                              </span>
                              <code className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-xs text-cyan-300">
                                {guide.sampleCommand}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => copyToClipboard(guide.sampleCommand!, guide.id)}
                                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                              >
                                {copiedCmd === guide.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>{lang === 'en' ? 'Copied' : 'কপি হয়েছে'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>{lang === 'en' ? 'Copy' : 'কপি'}</span>
                                  </>
                                )}
                              </button>
                              {onSendToTerminal && (
                                <button
                                  type="button"
                                  onClick={() => onSendToTerminal(guide.sampleCommand!)}
                                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition"
                                >
                                  <Terminal className="w-3.5 h-3.5" />
                                  <span>{lang === 'en' ? 'Run in Lab' : 'টার্মিনালে চালান'}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Mobile and Action Footer */}
                        <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => onNavigateTab(guide.tabId)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition shadow-md shadow-cyan-500/20"
                          >
                            <span>
                              {lang === 'en' ? `Launch ${guide.titleEn}` : `সরাসরি এই টুলে যান (${guide.titleBn})`}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Helpful Shortcuts & Summary Footer Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'en' ? 'Navigation Shortcuts & Tips' : 'শর্টকাট ও জরুরি ব্যবহারের টিপস'}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-semibold text-slate-300">
              {lang === 'en' ? 'Language Toggle' : 'ভাষা পরিবর্তন'}
            </span>
            <p>
              {lang === 'en'
                ? 'Click "বাংলা / English" at top right to switch language anywhere.'
                : 'উপরে ডানদিকের "বাংলা / English" বাটনে ক্লিক করে পুরো সাইট বাংলায় রূপান্তর করুন।'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-semibold text-slate-300">
              {lang === 'en' ? 'Traffic Engine Control' : 'লাইভ ট্রাফিক কন্ট্রোল'}
            </span>
            <p>
              {lang === 'en'
                ? 'Pause the live packet stream at any moment to study logs calmly.'
                : 'লগ ও প্যাকেট ধীরেসুস্থে দেখতে উপরের "Pause" বাটনে চাপ দিয়ে ট্রাফিক থামিয়ে নিন।'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="font-semibold text-slate-300">
              {lang === 'en' ? 'Terminal Practice' : 'টার্মিনালে সরাসরি প্র্যাকটিস'}
            </span>
            <p>
              {lang === 'en'
                ? 'From any cyber tool, click "Send to Terminal" to test without typing.'
                : 'সাইবার টুলস থেকে "Send to Terminal" চাপলেই টাইপ করা ছাড়াই কমান্ড টার্মিনালে লোড হয়।'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
