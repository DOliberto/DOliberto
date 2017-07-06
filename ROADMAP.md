# ROADMAP DOliberto

## planejamento

- [ ] requerimentos/entraves legais (@harllos)

- [ ] Mesquita deveria aderir ao lexML? como é processo?

- ontologia dos órgãos municipais
  em [protégé](http://protege.stanford.edu/)

	- é útil para fazer referências no DO
	
	- ver [SIORG](http://dados.gov.br/dataset/siorg)

- levantamento (ontologia tb?) do DO: que tipos de publicações, que
  campos contém, o que deve haver, etc.

- adequação das leis de Mesquita ao 
[lexML](http://projeto.lexml.gov.br/) [schema](http://projeto.lexml.gov.br/documentacao/Parte-3-XML-Schema.pdf)

	- já existe
      [DTD](https://en.wikipedia.org/wiki/Document_type_definition#XML_DTDs_and_schema_validation) 
	  para as leis brasileiras? (ver com @ppKrauss)
	
	- colocar as leis mesquitenses em site estático com versionamento
      git (fazer [consolidação](http://eur-lex.europa.eu/content/legis/avis_consolidation.html)?)
	
		- cada lei é um 
		[ID lexML](http://projeto.lexml.gov.br/documentacao/Parte-2-LexML-URN.pdf) 
		e uma git (hash) tree

- adaptar DTD e lexML ao DO

	- DOs em XML no mundo:
	  [federal register](https://www.federalregister.gov/reader-aids/developer-resources)
	  [EUR-Lex](http://eur-lex.europa.eu/content/help/faq/intro.html#top) []() 


## execução

- documentar tudo no github, de código e metas às atas de reuniões

- [ ] metodologia ágil

- desenvolvimento em [docker](https://www.docker.com/) container: sem
  problemas de compatibilidade windows/linux/mac

- opções de GUI:
  
  | framework | prós | contras |
  | --------- | ---- | ------- |
  | [atom](https://electron.atom.io/) | cross-platform, mt usado, bonito | dois runtimes: python e JS, não sabemos JS|
  | | |
