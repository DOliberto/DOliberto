% http://www.latex-project.org/help/documentation/clsguide.pdf
% https://en.wikibooks.org/wiki/LaTeX/
% https://www.sharelatex.com/learn/Multiple_columns
% https://www.sharelatex.com/learn/Commands
% https://www.sharelatex.com/learn/Environments

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{doliberto}[2017/09/21 Mesquita's D.O. class]

% 
%% load article class with options
\LoadClass[twocolumn, a4paper, 10pt]{article}

% pass unused options to article
\DeclareOption{onecolumn}{\OptionNotUsed}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax

%
%% package loading
\RequirePackage{polyglossia}
\RequirePackage{graphicx}
\RequirePackage{fancyhdr}
\RequirePackage{hyperref}
\RequirePackage[portuges]{datetime2}
\RequirePackage{datetime2-calc}
\RequirePackage{titlesec}

% brazilian portuguese support in XeLaTeX
\setmainlanguage{portuges}
\setlength{\columnseprule}{0.4pt}

%
%% variables

% counters
\newcounter{issue}
\newcommand\currentissue[1]{\setcounter{issue}{#1}}
\newcounter{month}
\newcommand\currentmonth[1]{\setcounter{month}{#1}}
\newcounter{year}
\newcommand\currentyear[1]{\setcounter{year}{#1}}
\newcounter{day}
\newcommand\currentday[1]{\setcounter{day}{#1}}

% date
\newcommand{\dataextenso}{\arabic{day} de \DTMportugesmonthname{\arabic{month}} de \arabic{year}}

% whose D.O.
\renewcommand{\@author}{Prefeitura Municipal de Mesquita}
\newcommand{\@email}{anexogabinete@mesquita.rj.gov.br}
\newcommand{\@site}{http://www.mesquita.rj.gov.br/}
\newcommand{\@location}{Mesquita}

%
%% text dimensions (for now, defaults from newspaper package)
\setlength\topmargin{-48pt} % article default = -58pt
\setlength\headheight{0pt} % article default = 12pt
\setlength\headsep{34pt} % article default = 25pt
\setlength\marginparwidth{-20pt} % article default = 121pt
\setlength\textwidth{7.0in} % article default = 418pt
\setlength\textheight{9.5in} % article default = 296pt
\setlength\oddsidemargin{-30pt}

\pagestyle{fancy}

\lhead{{\small\@location, \dataextenso}}
\chead{\textbf{Diário Oficial Nº \arabic{issue}}}
\rhead{{\small \@author}}
\lfoot{{\footnotesize \url{\@site}}}
\cfoot{\thepage}
\rfoot{{\footnotesize \href{mailto:\@email}{\@email}}}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}

%\renewcommand{\normalsize}{\fontsize{9}{10}\selectfont}
\setcounter{secnumdepth}{0}

%
%% commands for DOli

% this must be in text
%\titleformat*{\section}[block]{\large\bfseries\filcenter}{\thesection}{1em}{\MakeUppercase}

% título do ato
\newcommand\headline[1]{\begin{center} {\bfseries \MakeUppercase{#1}} \end{center} \par}
% quem assina
\newcommand\byline[2]{\begin{center} {\bfseries \MakeUppercase{#1}} \\%
			{\small\bfseries {#2}} \\ %
			\rule[3pt]{0.4\hsize}{0.5pt}\\ \end{center} \par}
% separando seções de cada secretaria
\newcommand\closearticle{{\begin{center}\rule[6pt]{\hsize}{1pt}\vspace*{-16pt}
			\rule{\hsize}{0.5pt}\end{center}}}