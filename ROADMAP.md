# ROADMAP DOliberto

## planejamento

- [ ] requerimentos/entraves legais (@harllos) 

- ontologia dos órgãos municipais
  em [protégé](http://protege.stanford.edu/)

	- é útil para fazer referências no DO
	
	- ver [SIORG](http://dados.gov.br/dataset/siorg)

- adequação das leis de Mesquita ao [lexML](http://projeto.lexml.gov.br/)

	- já existe [DTD](https://en.wikipedia.org/wiki/Document_type_definition#XML_DTDs_and_schema_validation) para as leis brasileiras? (ver com @ppKrauss)
	
	- colocar as leis mesquitenses em site estático com versionamento
      git
	
		- cada lei é um ID lexML e uma git (hash) tree

- [ ] Mesquita deveria aderir ao lexML? como é processo? 

- adaptar DTD e lexML ao DO

	- DOs em XML no mundo: [federal register](https://www.federalregister.gov/reader-aids/developer-resources)

- levantamento (ontologia tb?) do DO: que tipos de publicações, que
  campos contém, o que deve haver, etc.

## execução

- opções de GUI:
  
  | framework | prós | contras |
  | --------- | ---- | ------- |
  | [atom](https://electron.atom.io/) | cross-platform, mt usado, bonito | dois runtimes: python e JS, não sabemos JS|
  | | |

- desenvolvimento em [docker](https://www.docker.com/) container: sem
  problemas de compatibilidade windows/linux/mac

- [ ] metodologia ágil

- documentar tudo no github, de código e metas às atas de reuniões
