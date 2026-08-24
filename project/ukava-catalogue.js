/* UKAVA product catalogue — transcribed from the supplied UKAVA catalogues.
   Source of truth: uploads/UKAVA_Product_Catalogue_Website_Content.docx
   Do not add specifications that are not in that reference. */
(function () {
  var SCOOTER_FEATURES = [
    { name: "GPS Tracking", note: "On demand" },
    { name: "NFC", note: "On demand" },
    { name: "Mobile Charging", note: "Available" },
    { name: "Anti-theft Alarm", note: "Yes" },
    { name: "Digital Speedometre", note: "Yes" },
    { name: "Central Locking", note: "Yes" },
    { name: "Find my Scooty", note: "Yes" },
    { name: "Secure Parking", note: "Yes" },
    { name: "Battery Info", note: "Yes" },
    { name: "Reverse Gear", note: "Yes" },
    { name: "LED Head Light", note: "Yes" },
    { name: "Stylish Back Light", note: "Yes" }
  ];

  var COLOURS = [
    { name: "Black", hex: "#1b1917" },
    { name: "White", hex: "#f2f0ee" },
    { name: "Red", hex: "#b5231a" },
    { name: "Yellow", hex: "#e0a91b" }
  ];

  var BATTERY_ADVANTAGES = [
    { name: "LFP Technology", note: "" },
    { name: "High Energy Density", note: "" },
    { name: "Fast Charging", note: "" },
    { name: "Built-in Battery Management System (BMS)", note: "" },
    { name: "Environmentally Friendly", note: "" },
    { name: "Long Cycle Life", note: "" }
  ];

  var LINVA_FEATURES = [
    { name: "Smart Design Inverter with Inbuilt Battery", note: "" },
    { name: "Pure Sinewave", note: "" },
    { name: "Safe and Maintenance Free", note: "" },
    { name: "Option of Solar / Normal Electricity", note: "" },
    { name: "Battery Life Upto 12 Years", note: "" },
    { name: "Fast Charging 3-4 Hours", note: "" },
    { name: "No Fumes, No Battery Water Required", note: "" },
    { name: "Single Unit — Inverter + Battery", note: "" },
    { name: "ECO Friendly", note: "" },
    { name: "Uninterrupted Green Energy", note: "" },
    { name: "User Friendly LCD Display", note: "" },
    { name: "Safety & Protection", note: "" }
  ];

  function scooter(o) {
    return {
      name: o.name, cat: "electric-scooters", type: o.type || "Electric scooter",
      primary: [
        { value: o.speed, label: "Speed" },
        { value: o.motor, label: "Motor Power" },
        { value: "Lithium", label: "Battery Option" }
      ],
      highlightKicker: "Performance",
      highlight: [
        { value: o.speed, label: "Speed" },
        { value: o.motor, label: "Motor Power" },
        { value: "15 Degree", label: "Climbing" }
      ],
      moduleTitle: "Ride & handling",
      module: [
        { value: "Telescopic", label: "Front Suspension" },
        { value: "Coil Spring", label: "Rear Suspension" },
        { value: o.brake, label: "Brake" },
        { value: o.tyre, label: "Tyre" },
        { value: o.load, label: "Loading Capacity" }
      ],
      features: SCOOTER_FEATURES,
      colours: COLOURS,
      groups: [
        { title: "Performance & capacity", rows: [
          { label: "Speed", value: o.speed },
          { label: "Motor Power", value: o.motor },
          { label: "Climbing", value: "15 Degree" },
          { label: "Speed modes", value: "3 MODE" },
          { label: "Loading Capacity", value: o.load }
        ] },
        { title: "Battery & technology", rows: [
          { label: "Battery Option", value: "Lithium" },
          { label: "Battery & Charger", value: "Without" },
          { label: "Battery Info", value: "Yes" }
        ] },
        { title: "Suspension & brakes", rows: [
          { label: "Front Suspension", value: "Telescopic" },
          { label: "Rear Suspension", value: "Coil Spring" },
          { label: "Brake", value: o.brake },
          { label: "Tyre", value: o.tyre }
        ] },
        { title: "Smart features", rows: [
          { label: "GPS Tracking", value: "On Demand" },
          { label: "NFC", value: "ON DEMAND" },
          { label: "Mobile Charging", value: "AVAILABLE" },
          { label: "Anti-theft Alarm", value: "Yes" },
          { label: "Speedometre", value: "Digital" },
          { label: "Central Locking", value: "Yes" },
          { label: "Find my Scooty", value: "Yes" },
          { label: "Secure Parking", value: "Yes" },
          { label: "Reverse Gear", value: "Yes" }
        ] },
        { title: "Design & utility", rows: [
          { label: "Body Type", value: o.body },
          { label: "Head Light", value: "LED" },
          { label: "Back Light", value: "STYLISH" },
          { label: "Floor mat", value: o.mat },
          { label: "Boot Space", value: o.boot },
          { label: "Colour options", value: "Black, White, Red, Yellow" }
        ] },
        { title: "Warranty", rows: [
          { label: "Warranty Motor", value: "1 Year" },
          { label: "Warranty Controller", value: "1 Year" }
        ] }
      ]
    };
  }

  function battery(o) {
    return {
      name: o.name, cat: "lithium-batteries", type: o.type,
      primary: [
        { value: o.headline, label: o.headlineLabel },
        { value: o.warranty, label: "Warranty shown" },
        { value: "LFP", label: "Technology" }
      ],
      highlightKicker: "Technology",
      highlight: [
        { value: "LFP", label: "Cell technology" },
        { value: o.headline, label: o.headlineLabel },
        { value: o.warranty, label: "Warranty shown" }
      ],
      moduleTitle: "Catalogue-listed advantages",
      module: [
        { value: "LFP Technology", label: "Cell chemistry" },
        { value: "High Energy Density", label: "Energy" },
        { value: "Fast Charging", label: "Charging" },
        { value: "Built-in BMS", label: "Management" },
        { value: "Long Cycle Life", label: "Durability" }
      ],
      features: BATTERY_ADVANTAGES,
      colours: [],
      groups: [
        { title: o.modelsLabel, rows: o.models.map(function (m) { return { label: m, value: "" }; }) },
        { title: "Technology", rows: [
          { label: "Technology", value: "LFP" },
          { label: "Battery Management System", value: "Built-in BMS" },
          { label: "Charging", value: "Fast Charging" }
        ] },
        { title: "Warranty", rows: [{ label: "Warranty shown", value: o.warranty }] }
      ].concat(o.extraGroups || [])
    };
  }

  function linva(o) {
    var solar = o.cat === "solar-solutions";
    return {
      name: o.name, cat: o.cat,
      type: solar ? "MPPT Solar PCU — inverter + inbuilt lithium battery" : "MPPT PCU — inverter + inbuilt lithium battery",
      primary: solar
        ? [{ value: o.power, label: "Power" }, { value: "100 AH", label: "Battery Capacity" }, { value: o.panels, label: "Recommended Solar Panels" }]
        : [{ value: o.power, label: "Power" }, { value: "100 AH", label: "Battery Capacity" }, { value: "3 Hours at 400 W", label: "Battery Backup" }],
      highlightKicker: "Power & backup",
      highlight: [
        { value: o.power, label: "Power" },
        { value: "100 AH", label: "Battery Capacity" },
        { value: "3 Hours at 400 W", label: "Battery Backup" }
      ],
      moduleTitle: solar ? "Solar & system" : "System & installation",
      module: (solar
        ? [{ value: o.panels, label: "Recommended Solar Panels" }]
        : []).concat([
        { value: o.config, label: "Model configuration" },
        { value: "1.28 kW", label: "Wattage" },
        { value: "50 Hz", label: "Frequency" },
        { value: "Wall Mount", label: "Mounting Type" },
        { value: "Home, Offices & Shops", label: "Suitable For" }
      ]),
      features: LINVA_FEATURES,
      colours: [],
      groups: [
        { title: "Power & backup", rows: [
          { label: "Power", value: o.power },
          { label: "Battery Capacity", value: "100 AH" },
          { label: "Battery Backup (Hrs)", value: "3 Hours at 400 W" },
          { label: "Wattage", value: "1.28 kW" },
          { label: "Frequency", value: "50 Hz" }
        ] },
        { title: "Battery & technology", rows: [
          { label: "Battery Type", value: "Inbuilt Lithium Battery" },
          { label: "Type of Product", value: solar ? "MPPT SOLAR PCU" : "MPPT PCU" },
          { label: "Power Source", value: "Solar and Battery Powered" },
          { label: "Output", value: "Pure Sinewave" },
          { label: "Charging", value: "Fast Charging 3-4 Hours" }
        ] },
        solar
          ? { title: "Solar input", rows: [
              { label: "Recommended Solar Panels", value: o.panels },
              { label: "Power Source", value: "Solar and Battery Powered" }
            ] }
          : { title: "Installation & suitability", rows: [
              { label: "Mounting Type", value: "Wall Mount" },
              { label: "Suitable For", value: "Home, Offices & Shops" },
              { label: "Model configuration", value: o.config }
            ] },
        { title: "Model & pricing", rows: [
          { label: "Model No", value: o.name },
          { label: "Model configuration", value: o.config },
          { label: "MRP", value: o.mrp },
          { label: "Distributor rate", value: "Shared with UKAVA partners on request" }
        ] },
        { title: "Warranty", rows: [{ label: "Warranty shown", value: "10 Years" }] }
      ]
    };
  }

  var PRODUCTS = [
    scooter({ name: "UKAVA Strom", speed: "55 KMPH", motor: "1000 WATT", brake: "DISC", tyre: "10-10 Tubeless", load: "200 KG", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Rapid", speed: "55 KMPH", motor: "1000 WATT", brake: "DISC", tyre: "12-12 Tubeless", load: "180 kg", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Raya", speed: "55 KMPH", motor: "1500 WATT", brake: "DISC", tyre: "12-12 Tubeless", load: "200 KG", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Vega", speed: "55 KMPH", motor: "1500 WATT", brake: "DOUBLE DISC", tyre: "12-12 Tubeless", load: "200 KG", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Aura", speed: "55 KMPH", motor: "1500 WATT", brake: "DOUBLE DISC", tyre: "12-12 Tubeless", load: "200 KG", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Zyro", speed: "55 KMPH", motor: "1500 WATT", brake: "DOUBLE DISC", tyre: "12-12 Tubeless", load: "200 KG", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Torra", speed: "55 KMPH", motor: "1500 WATT", brake: "DOUBLE DISC", tyre: "2-12 Tubeless", load: "200 KG", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Trivolt", speed: "55 KMPH", motor: "1500 WATT", brake: "DRUM", tyre: "10-10 Tubeless", load: "200 KG", body: "ABS", mat: "Yes", boot: "Available" }),
    scooter({ name: "UKAVA Cargo", speed: "55 KMPH", motor: "1500 WATT", brake: "DISC", tyre: "10-10 Tubeless", load: "200 KG", body: "IRON", mat: "No", boot: "No" }),

    battery({
      name: "Lithium Inverter Batteries", type: "Inverter battery",
      headline: "12.8V – 48V", headlineLabel: "Models available", warranty: "10 Years",
      modelsLabel: "Models", models: ["12.8V 100AH", "25.6V 100AH", "48V 100AH", "48V 200AH"]
    }),
    battery({
      name: "ESS (Energy Storage System)", type: "Energy storage system",
      headline: "48V to 360V", headlineLabel: "Range", warranty: "10 Years",
      modelsLabel: "Range", models: ["48V TO 360V, & 100AH ONWARDS"],
      extraGroups: [{ title: "Commercial", rows: [{ label: "Rate", value: "RATE WILL BE AVAILABLE ON DEMAND" }] }]
    }),
    battery({
      name: "Electric Three-Wheeler Lithium Battery", type: "Three-wheeler battery",
      headline: "51.2V / 60.8V", headlineLabel: "System voltage", warranty: "3 Years",
      modelsLabel: "Models", models: ["51.2V 100AH", "51.2V 150AH", "51.2V 200AH", "60.8V 100AH", "60.8V 150AH", "60.8V 200AH"]
    }),
    battery({
      name: "Electric Two-Wheeler Lithium Battery", type: "Two-wheeler battery",
      headline: "48V / 60V", headlineLabel: "System voltage", warranty: "3 Years",
      modelsLabel: "Available ranges", models: ["60V 20AH", "60V 24AH", "60V 32AH", "60V 36AH", "60V 40AH", "48V 18AH", "48V 24AH", "48V 30AH", "60V 18AH", "60V 30AH"]
    }),
    battery({
      name: "Rechargeable LFP Battery", type: "LFP battery",
      headline: "12.8V – 25.6V", headlineLabel: "Models available", warranty: "3 Years",
      modelsLabel: "Models", models: ["12.8V 6AH", "25.6V 12AH", "25.6V 18AH"]
    }),

    linva({ name: "LINVA 1000", cat: "inverter-battery", power: "1000 VA", config: "1000VA / 12V", mrp: "INR 25,555/-" }),
    linva({ name: "LINVA 1500", cat: "inverter-battery", power: "1500 VA", config: "1500VA / 12V", mrp: "INR 26,666/-" }),
    linva({ name: "LINVA 2500", cat: "inverter-battery", power: "2500 VA", config: "2500VA / 24V", mrp: "INR 28,888/-" }),

    linva({ name: "LINVASOL 1050", cat: "solar-solutions", power: "1050 VA", config: "1050VA / 12V", mrp: "INR 31,111/-", panels: "540 W Mono half-cut Bifacial × 2" }),
    linva({ name: "LINVASOL 1550", cat: "solar-solutions", power: "1550 VA", config: "1550VA / 12V", mrp: "INR 32,500/-", panels: "540 W Mono half-cut Bifacial × 2" }),
    linva({ name: "LINVASOL 2550", cat: "solar-solutions", power: "2550 VA", config: "2550VA / 24V", mrp: "INR 35,500/-", panels: "540 W Mono half-cut Bifacial × 4" })
  ];

  var CATEGORIES = [
    { key: "electric-scooters", label: "Electric Scooters", intro: "Explore UKAVA's range of electric scooters and vehicles." },
    { key: "lithium-batteries", label: "Lithium Batteries", intro: "Lithium storage for inverters, vehicles and energy systems." },
    { key: "inverter-battery", label: "Inverter & Battery", intro: "LINVA inverters with inbuilt lithium batteries for homes, offices and shops." },
    { key: "solar-solutions", label: "Solar Solutions", intro: "LINVASOL solar PCUs with inbuilt lithium batteries and recommended panel sizing." }
  ];

  window.UKAVA = {
    products: PRODUCTS,
    categories: CATEGORIES,
    slugify: function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); },
    byCat: function (key) { return PRODUCTS.filter(function (p) { return p.cat === key; }); },
    find: function (slug) {
      var sl = window.UKAVA.slugify;
      return PRODUCTS.filter(function (p) { return sl(p.name) === slug; })[0] || null;
    }
  };
})();
