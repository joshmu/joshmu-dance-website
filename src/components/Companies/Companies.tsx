import Banner from '@/shared/Banner/Banner'

const companyBannerImg = '/assets/zero_group_pg.jpg'

const Companies = () => {
  const companies = {
    title: 'some companies I have worked for',
    highlight: 'companies',
    image: companyBannerImg,
    imageAlt: "josh mu's choreographic work ZERO, image taken by Pedro Grieg",
    raw: [
      {
        name: 'Sydney Dance Company',
        url: 'https://www.sydneydancecompany.com',
      },
      {
        name: 'Dancenorth',
        url: 'https://wwww.dancenorth.com.au',
      },
      {
        name: 'Chunky Move',
        url: 'https://www.chunkymove.com.au',
      },
      {
        name: 'Stephanie Lake Company',
        url: 'https://www.stephanielake.com.au',
      },
      {
        name: 'Sydney Theatre Company',
        url: 'https://wwww.sydneytheatrecompany.com.au',
      },
      {
        name: 'Force Majeure',
        url: 'https://www.forcemajeure.com.au',
      },
      {
        name: 'Marrugeku',
        url: 'https://www.marrugeku.com.au',
      },
      {
        name: 'Shaun Parker & Company',
        url: 'https://www.shaunparkercompany.com',
      },
      {
        name: 'Foxtel',
        url: 'https://www.foxtel.com.au',
      },
      {
        name: 'Perth Theatre Company',
        url: 'https://www.perththeatre.com.au',
      },
    ],
    duration: 2000,
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

function Company(data) {
  return (
    <div>
      <a href={data.url} target='_blank' className='uppercase text-md'>
        <p>{data.name}</p>
      </a>
    </div>
  )
}

export default Companies
