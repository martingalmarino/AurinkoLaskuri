import { FAQData, FAQItem, KuntaData, ROICalculationResult } from './types';

export interface FAQContext {
  kunta: KuntaData;
  roiResult?: ROICalculationResult;
  electricityPrice?: number;
  solarRadiation?: number;
}

export class FAQGenerator {
  private generateBasicFAQs(kunta: KuntaData): FAQItem[] {
    return [
      {
        question: `Kuinka ROI lasketaan aurinkopaneeleille ${kunta.name}ssa?`,
        answer: `Laskuri käyttää FMI:n säteilytietoja ja sähkön hintaa arvioidakseen takaisinmaksuajan. Laskenta sisältää valtion tuen (${(kunta.subsidy.national.rate * 100).toFixed(0)}%) ja paikallisen tuen ${kunta.name}ssa (${(kunta.subsidy.local.rate * 100).toFixed(0)}%), mikä lyhentää merkittävästi takaisinmaksuaikaa.`
      },
      {
        question: `Onko saatavilla valtion tai paikallisia tukia ${kunta.name}ssa?`,
        answer: `Kyllä! ${kunta.name}ssa on saatavilla valtion tuki aurinkopaneeleille (${(kunta.subsidy.national.rate * 100).toFixed(0)}%) sekä paikallinen tuki (${(kunta.subsidy.local.rate * 100).toFixed(0)}%). Yhteensä tukien osuus voi olla jopa ${((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}% asennuskustannuksista.`
      },
      {
        question: `Miten sähkön hinta vaikuttaa takaisinmaksuaikaan ${kunta.name}ssa?`,
        answer: `Korkeampi sähkön hinta nopeuttaa aurinkopaneelien investoinnin takaisinmaksua merkittävästi. Kun sähkön hinta nousee, vuosittaiset säästöt kasvavat ja takaisinmaksuaika lyhenee. Laskuri käyttää ajantasaisia sähkön hintoja Nord Pool -pörssistä.`
      },
      {
        question: `Kuinka paljon energiaa aurinkopaneelit tuottavat ${kunta.name}ssa?`,
        answer: `Energiantuotanto riippuu järjestelmän koosta ja paikallisista olosuhteista. ${kunta.name} sijaitsee alueella, jossa aurinkosäteily on riittävää tehokkaalle energiantuotannolle. Laskuri ottaa huomioon paikalliset säteilytiedot FMI:ltä.`
      },
      {
        question: `Mikä on paras aika asentaa aurinkopaneelit ${kunta.name}ssa?`,
        answer: `Aurinkopaneelit voidaan asentaa ympäri vuoden, mutta kevät on usein paras aika, koska järjestelmä on valmis kesän korkean energiantuotannon aikaan. Asennusajat vaihtelevat asennusyrityksen mukaan.`
      },
      {
        question: `Kuinka kauan aurinkopaneelit kestävät ${kunta.name}ssa?`,
        answer: `Modernit aurinkopaneelit kestävät 25-30 vuotta ja säilyttävät yli 80% alkuperäisestä tehokkuudestaan. Suomalaiset olosuhteet eivät vaikuta paneelien elinkaareen, koska ne on suunniteltu kestämään erilaisia sääolosuhteita.`
      },
      {
        question: `Vaativatko aurinkopaneelit paljon huoltoa ${kunta.name}ssa?`,
        answer: `Aurinkopaneelit vaativat vähän huoltoa. Lumi putoaa luonnollisesti paneelien kaltevasta pinnoitteesta. Vuosittainen tarkastus ja mahdollinen puhdistus riittää yleensä. Monet asennusyritykset tarjoavat huoltopalveluja.`
      },
      {
        question: `Voinko asentaa aurinkopaneelit itse ${kunta.name}ssa?`,
        answer: `Aurinkopaneelien asennus vaatii sähköalan ammattitaitoa ja rakennuslupaa. Suosittelemme käyttämään sertifioitua asennusyritystä, joka hoitaa kaikki lupien hakemisen ja takuun.`
      }
    ];
  }

  private generateContextualFAQs(context: FAQContext): FAQItem[] {
    const { kunta, roiResult, electricityPrice, solarRadiation } = context;
    const faqs: FAQItem[] = [];

    if (roiResult) {
      faqs.push({
        question: `Mikä on takaisinmaksuaika aurinkopaneelille ${kunta.name}ssa?`,
        answer: `Tämän laskurin mukaan takaisinmaksuaika on ${roiResult.roiYears.toFixed(1)} vuotta. Tämä ottaa huomioon ${(kunta.subsidy.national.rate * 100).toFixed(0)}% valtion tuen ja ${(kunta.subsidy.local.rate * 100).toFixed(0)}% paikallisen tuen. 20 vuoden aikana säästöjä voi kertyä ${roiResult.totalSavings20Years.toLocaleString('fi-FI')} €.`
      });

      faqs.push({
        question: `Kuinka paljon säästän vuodessa aurinkopaneelilla ${kunta.name}ssa?`,
        answer: `Vuosittaiset säästöt ovat ${roiResult.annualSavings.toLocaleString('fi-FI')} €. Tämä perustuu järjestelmän tuottamaan ${roiResult.annualEnergyProduction.toLocaleString('fi-FI')} kWh energiaan vuodessa ja nykyisiin sähkön hintoihin.`
      });
    }

    if (electricityPrice) {
      faqs.push({
        question: `Miten sähkön hinta ${electricityPrice.toFixed(3)} €/kWh vaikuttaa säästöihin ${kunta.name}ssa?`,
        answer: `Nykyinen sähkön hinta ${electricityPrice.toFixed(3)} €/kWh tekee aurinkopaneelien investoinnista kannattavan. Jos sähkön hinta nousee, säästöt kasvavat entisestään ja takaisinmaksuaika lyhenee.`
      });
    }

    if (solarRadiation) {
      faqs.push({
        question: `Onko ${kunta.name} sopiva aurinkopaneelien asentamiseen?`,
        answer: `Kyllä! ${kunta.name}ssa vuotuinen aurinkosäteily on ${solarRadiation} kWh/m², mikä on riittävä tehokkaalle energiantuotannolle. Suomi on yllättävän hyvä aurinkoenergian maa, erityisesti kesäkuukausina.`
      });
    }

    return faqs;
  }

  generateFAQForKunta(context: FAQContext): FAQData {
    const basicFAQs = this.generateBasicFAQs(context.kunta);
    const contextualFAQs = this.generateContextualFAQs(context);
    const allFAQs = [...basicFAQs, ...contextualFAQs];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  generateFAQItems(context: FAQContext): FAQItem[] {
    const basicFAQs = this.generateBasicFAQs(context.kunta);
    const contextualFAQs = this.generateContextualFAQs(context);
    return [...basicFAQs, ...contextualFAQs];
  }

  // Generate FAQ JSON-LD string for injection into HTML head
  generateFAQJsonLd(context: FAQContext): string {
    const faqData = this.generateFAQForKunta(context);
    return JSON.stringify(faqData, null, 2);
  }

  // Get FAQ items for specific topics
  getFAQByTopic(topic: 'roi' | 'installation' | 'maintenance' | 'subsidies', kunta: KuntaData): FAQItem[] {
    const topicFAQs: Record<string, FAQItem[]> = {
      roi: [
        {
          question: `Kuinka lasken aurinkopaneelien ROI:n ${kunta.name}ssa?`,
          answer: `ROI lasketaan jakamalla nettoasennuskustannukset vuosittaisten säästöjen määrällä. Laskuri ottaa huomioon valtion ja paikalliset tuet, sähkön hinnan sekä energiantuotannon.`
        },
        {
          question: `Mikä on hyvä ROI aurinkopaneelille ${kunta.name}ssa?`,
          answer: `Hyvä ROI on alle 10 vuotta. ${kunta.name}ssa takaisinmaksuaika on yleensä 6-12 vuotta, mikä on erinomainen sijoitus energiatehokkuuteen.`
        }
      ],
      installation: [
        {
          question: `Kuinka kauan aurinkopaneelien asennus kestää ${kunta.name}ssa?`,
          answer: `Asennus kestää yleensä 1-3 päivää riippuen järjestelmän koosta. Asennusyritys hoitaa kaikki lupien hakemisen ja sähköliittymän.`
        },
        {
          question: `Tarvitsenko rakennusluvan aurinkopaneelien asentamiseen ${kunta.name}ssa?`,
          answer: `Rakennuslupa tarvitaan yleensä, jos paneelit asennetaan katolle. Asennusyritys hoitaa lupien hakemisen puolestasi.`
        }
      ],
      maintenance: [
        {
          question: `Kuinka usein aurinkopaneelit pitää puhdistaa ${kunta.name}ssa?`,
          answer: `Suomalaisissa olosuhteissa paneelit pysyvät melko puhtaina sateen ja tuulen ansiosta. Vuosittainen tarkastus riittää yleensä.`
        },
        {
          question: `Mitä tapahtuu aurinkopaneelille talvella ${kunta.name}ssa?`,
          answer: `Lumi putoaa luonnollisesti paneelien kaltevasta pinnoitteesta. Paneelit tuottavat energiaa myös pilvisinä päivinä ja talvella, vaikka tuotanto on pienempää.`
        }
      ],
      subsidies: [
        {
          question: `Miten haen valtion tuen aurinkopaneelille ${kunta.name}ssa?`,
          answer: `Valtion tuki haetaan Motivan kautta. Asennusyritys voi auttaa hakemusprosessissa. Paikallinen tuki haetaan ${kunta.name}ssa erikseen.`
        },
        {
          question: `Voinko saada molemmat tuet ${kunta.name}ssa?`,
          answer: `Kyllä! Voit saada sekä valtion tuen (${(kunta.subsidy.national.rate * 100).toFixed(0)}%) että ${kunta.name}ssa paikallisen tuen (${(kunta.subsidy.local.rate * 100).toFixed(0)}%).`
        }
      ]
    };

    return topicFAQs[topic] || [];
  }
}

// Export singleton instance
export const faqGenerator = new FAQGenerator();
