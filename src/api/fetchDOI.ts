import axios from "axios";

async function fetchDoi(doi: string) {
  const url = `https://api.crossref.org/works/${doi}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchDoi };

/*

{
  "status": "ok",
  "message-type": "work",
  "message-version": "1.0.0",
  "message": {
    "indexed": {
      "date-parts": [
        [
          2022,
          3,
          31
        ]
      ],
      "date-time": "2022-03-31T19:36:44Z",
      "timestamp": 1648755404980
    },
    "reference-count": 0,
    "publisher": "Universidad del Pacifico - Colombia",
    "issue": "1",
    "license": [
      {
        "start": {
          "date-parts": [
            [
              2019,
              1,
              1
            ]
          ],
          "date-time": "2019-01-01T00:00:00Z",
          "timestamp": 1546300800000
        },
        "content-version": "vor",
        "delay-in-days": 0,
        "URL": "https://creativecommons.org/licenses/by/4.0"
      }
    ],
    "content-domain": {
      "domain": [
        "psychoceramics.labs.crossref.org"
      ],
      "crossmark-restriction": false
    },
    "short-container-title": [
      "Sabia. Rev. Cient."
    ],
    "abstract": "<jats:p>Este trabajo se llevó a cabo en Majucla, colonia ubicada en el municipio de Cuscatancingo San Salvador, e involucra a los jóvenes del Comité Juvenil Expresión Hip Hop. El objeto del trabajo es presentar a Majucla, el barrio y sus calles, como cuna de saberes emergentes de las artes urbanas o cuna de actividades artísticas hip hop y lo que implica el concepto emergente frente al saber disciplinar y la epistemología. Por contraste con el saber académico es conveniente acuñar este concepto que alude a lo menor, lo excluido, lo subordinado, en analogía con la vida que pende de un hilo en los sectores deprimidos. Saberes emergentes es llegar a ser mientras las actividades de los jóvenes se dirigen a crear e intentar comercializar sus obras. Pese a las dificultades encontradas, principalmente por la violencia imperante y las barreras de acceso a la educación, los jóvenes siguen empeñados en crear arte y fortalecer el colectivo. Aprenden en la universidad de la calle aquellos saberes que les permitan identificarse como diferentes y resistir en las condiciones en que les tocó vivir.</jats:p>",
    "DOI": "10.47366/sabia.v5n1a3",
    "type": "journal-article",
    "created": {
      "date-parts": [
        [
          2020,
          10,
          9
        ]
      ],
      "date-time": "2020-10-09T02:53:20Z",
      "timestamp": 1602212000000
    },
    "page": "34-50",
    "update-policy": "http://dx.doi.org/10.47366/crossmark",
    "source": "Crossref",
    "is-referenced-by-count": 0,
    "title": [
      "Saberes emergentes de las artes urbanas y cultura de paz. Un estudio de caso en San Salvador"
    ],
    "prefix": "10.47366",
    "volume": "5",
    "author": [
      {
        "ORCID": "http://orcid.org/0000-0002-0896-423X",
        "authenticated-orcid": false,
        "given": "Camilo Enrique",
        "family": "Pinilla Toro",
        "sequence": "first",
        "affiliation": [
          {
            "name": "Fundación Universitaria Popayán"
          }
        ]
      }
    ],
    "member": "27059",
    "published-online": {
      "date-parts": [
        [
          2019,
          1,
          1
        ]
      ]
    },
    "container-title": [
      "Sabia Revista Científica"
    ],
    "original-title": [],
    "link": [
      {
        "URL": "http://ediciones.unipacifico.edu.co/index.php/sabia/article/download/18/18",
        "content-type": "application/pdf",
        "content-version": "vor",
        "intended-application": "text-mining"
      },
      {
        "URL": "http://ediciones.unipacifico.edu.co/index.php/sabia/article/download/18/18",
        "content-type": "unspecified",
        "content-version": "vor",
        "intended-application": "similarity-checking"
      }
    ],
    "deposited": {
      "date-parts": [
        [
          2020,
          10,
          9
        ]
      ],
      "date-time": "2020-10-09T04:32:29Z",
      "timestamp": 1602217949000
    },
    "score": 1,
    "resource": {
      "primary": {
        "URL": "http://ediciones.unipacifico.edu.co/index.php/sabia/article/view/18"
      }
    },
    "subtitle": [],
    "short-title": [],
    "issued": {
      "date-parts": [
        [
          2019,
          1,
          1
        ]
      ]
    },
    "references-count": 0,
    "journal-issue": {
      "issue": "1",
      "published-online": {
        "date-parts": [
          [
            2019,
            1,
            1
          ]
        ]
      }
    },
    "URL": "http://dx.doi.org/10.47366/sabia.v5n1a3",
    "relation": {},
    "ISSN": [
      "2711-4775",
      "2323-0576"
    ],
    "issn-type": [
      {
        "value": "2711-4775",
        "type": "electronic"
      },
      {
        "value": "2323-0576",
        "type": "print"
      }
    ],
    "published": {
      "date-parts": [
        [
          2019,
          1,
          1
        ]
      ]
    },
    "assertion": [
      {
        "value": "2018-08-01",
        "order": 0,
        "name": "received",
        "label": "Received",
        "group": {
          "name": "publication_history",
          "label": "Publication History"
        }
      },
      {
        "value": "2018-12-01",
        "order": 1,
        "name": "accepted",
        "label": "Accepted",
        "group": {
          "name": "publication_history",
          "label": "Publication History"
        }
      },
      {
        "value": "2019-01-01",
        "order": 2,
        "name": "published_online",
        "label": "Published Online",
        "group": {
          "name": "publication_history",
          "label": "Publication History"
        }
      },
      {
        "value": "Universidad del Pacífico",
        "name": "publisher",
        "label": "This article is maintained by"
      },
      {
        "value": "Saberes emergentes de las artes urbanas y cultura de paz. Un estudio de caso en San Salvador",
        "name": "articletitle",
        "label": "Article Title"
      },
      {
        "value": "Sabia. Revista Científica",
        "name": "journaltitle",
        "label": "Journal Title"
      },
      {
        "value": "https://doi.org/10.47366/sabia",
        "name": "articlelink",
        "label": "CrossRef DOI link to publisher maintained version"
      },
      {
        "value": "article",
        "name": "content_type",
        "label": "Content Type"
      },
      {
        "value": "© 2019 Universidad del Pacífico",
        "name": "copyright",
        "label": "Copyright"
      }
    ]
  }
}

*/