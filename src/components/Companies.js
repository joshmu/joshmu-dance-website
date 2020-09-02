import Banner from './Banner'

export default function Companies() {
  const companies = {
    title: 'some companies I have worked for',
    highlight: 'companies',
    raw: ['Sydney Dance Company', 'Marrugeku', 'Force Majeure', 'Chunky Move'],
    duration: 2000,
    image: './assets/sand.jpg',
    imageAlt: 'josh mu airborne on the beach',
  }

  companies.content = companies.raw.map(Company)

  return (
    <Banner
      title={companies.title}
      titleHighlight={companies.highlight}
      sliderContent={companies.content}
      duration={companies.duration}
      image={companies.image}
      imageAlt={companies.imageAlt}
    />
  )
}

function Company(txt) {
  return (
    <div>
      <p className='uppercase text-md'>{txt}</p>
    </div>
  )
}
