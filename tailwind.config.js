/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins:'Poppins, sans-serif'
      },
      left:{
        "1/5":'20%'
      },
      maxWidth:{
        '10xl':'1500px'
      },
      colors: {
        bbg: "#ECF2FB",
        bblue: "#437ADB",
        bash: "#77828D",
        bborder: "#2C2C2C",
        hoverblue: "#C7D7F4",
        bred: "#A7194B",
        lightblue: "#ECF2FB",
        bidsbg: "#E6E9ED",
        pbg: "#F1F2F4",
        borange: "#FF8A34",
        ashShade: [
          "#F1F2F4",
          "#5E6777",
          "#9099A8",
          "#E4E6EA",
          "#C8CDD4",
          "#E6E9ED",
          "#121212",
          "#C8CDD4",
          "rgba(241, 242, 244, 0.5)",
          "#E4E6EA",
        ],
        submission: ["#F8EFD8", "#E3F2E0"],
        bgreen: ["#459A33"],
        bblack: ["#091C2F", "#222B34"],
        boverlay: "rgba(0,0,0,.8)",
        lightShades: ["#FFF3EB", "#F6E8ED"],
        redShades: ["#A7194B"],
        blueShades: ["#365EAF"],

        submission: ["#F8EFD8", "#E3F2E0"],
        bgreen: ["#459A33", "#E3F2E0"],
        bblack: ["#091C2F"],
        boverlay: "rgba(0,0,0,.8)",
        bwhite: "rgba(250,250,250,.8)",
        C2B48EA: "#2B48EA",
        byellow: ["#F8EFD8", "#E2AE29"],
        whitesmoke:"whitesmoke"
      },
    },
  },
  plugins: [],
}
