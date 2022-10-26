import Image from "next/image";

function BetterScrumLogoWithText() {
  return (
    <div style={{ width: '90%', height: '2rem' }}>
      <Image
        src="/Better_Scrum_Logo_With_Text.svg"
        layout="responsive"
        width={404.857}
        height={67.633}
        alt="better-scrum logo"
      />
    </div>
  )
}

export default BetterScrumLogoWithText;