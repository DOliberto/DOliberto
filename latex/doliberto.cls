% https://tex.stackexchange.com/questions/393209/maketitle-output-invading-text/

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
\RequirePackage{titletoc}
\RequirePackage[skins]{tcolorbox}

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
%\setlength\headheight{0pt} % article default = 12pt
\setlength\headsep{34pt} % article default = 25pt
\setlength\marginparwidth{-20pt} % article default = 121pt
\setlength\textwidth{504pt} % article default = 418pt
\setlength\textheight{684pt} % article default = 296pt
\setlength\oddsidemargin{-30pt}

\fancypagestyle{firstpage}{
\lhead{}
\chead{}
\rhead{}
\lfoot{{\footnotesize \url{\@site}}}
\cfoot{\thepage}
\rfoot{{\footnotesize \href{mailto:\@email}{\@email}}}
\renewcommand{\footrulewidth}{0.4pt}
}

% to really emulate Mesquita's DO, we can use http://mirrors.concertpass.com/tex-archive/macros/latex/contrib/tcolorbox/tcolorbox.pdf
% https://tex.stackexchange.com/questions/146781/place-image-and-text-in-same-title-line

\newcommand{\makedolititle}{\thispagestyle{firstpage}
  \twocolumn[{
    \vspace*{-40pt}
    \begin{center}
      {\setlength\fboxsep{3mm}\raisebox{12pt}{\parbox[c]{1.15in}{\includegraphics[height=2.5cm]{prefeitura-mesquita.jpg}}}}
    \hfill%
    \parbox[c][2.5cm][c]{0.75\textwidth}{{\Large\bfseries{\@author}}\\{\fontsize{1.5cm}{2.25cm}\selectfont \phantom{|} %to make spacing nicer
        \MakeUppercase{Diário Oficial}}}\\%	
    \vspace*{0.1in}
    \rule[0pt]{\textwidth}{0.5pt}\\
    {\small \@author} \hfill \textbf{Nº \arabic{issue}} \hfill {\small \@location, \dataextenso}\\
    \rule[6pt]{\textwidth}{1.2pt}
  \end{center}
  }]}

\newcommand{\makedoli}{\thispagestyle{firstpage}
  \twocolumn[{
  \vspace*{-40pt}
  \begin{center}
    {\setlength\fboxsep{3mm}\raisebox{12pt}{\parbox[c]{1.15in}{\includegraphics[height=2.5cm]{prefeitura-mesquita.jpg}}}}
    \hfill%
    {\Huge \MakeUppercase{Diário Oficial}}\hfill\\%	
    %\raisebox{12pt}{\textbf{\footnotesize \@author}}\\
    \vspace*{0.1in}
    \rule[0pt]{\textwidth}{0.5pt}\\
    {\small \@author} \hfill \textbf{Nº \arabic{issue}} \hfill {\small \@location, \dataextenso}\\
    \rule[6pt]{\textwidth}{1.2pt}
  \end{center}
  }]
}

\newcommand{\dolititle}{
  \thispagestyle{firstpage}
  \twocolumn[{
    \begin{minipage}[t][][t]{0.15\textwidth}
      \includegraphics[height=2.5cm]{prefeitura-mesquita.jpg}
    \end{minipage}
    \hfill
    \begin{minipage}[t][][t]{0.75\textwidth}
      \textbf{\Large \@author}\\
        {\Huge \MakeUppercase{Diário Oficial}}%
    \end{minipage}
    \vspace*{0.1in}
    \rule[0pt]{\textwidth}{0.5pt}\\
    {\small \@location, \dataextenso} \hfill \textbf{Nº \arabic{issue}}\\
    \rule[6pt]{\textwidth}{1.2pt}
        }
    ]}

\renewcommand{\maketitle}{\thispagestyle{firstpage}
  \twocolumn[{
  \vspace*{-40pt}
  \begin{center}
    {\setlength\fboxsep{3mm}\raisebox{12pt}{\framebox[1.2\width]{\parbox[c]{1.15in}{\includegraphics[height=2.5cm]{prefeitura-mesquita.jpg}}}}}
    \hfill%
    {\Huge \MakeUppercase{Diário Oficial}}\hfill%	
    \raisebox{12pt}{\textbf{\footnotesize \@author}}\\
    \vspace*{0.1in}
    \rule[0pt]{\textwidth}{0.5pt}\\
    {\small {\small\@location, \dataextenso} \hfill \textbf{Nº \arabic{issue}}}\\
    \rule[6pt]{\textwidth}{1.2pt}
  \end{center}
  }]
}

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

\titlecontents{section}[0pt]{\addvspace{1pc}%
}%
{\contentsmargin{0pt}%
  \bfseries
  \makebox[0.5pt][r]{\footnotesize\thecontentslabel\enspace}%
  \large}
{\contentsmargin{0pt}%
  \large}
{\quad\thepage}[\addvspace{.5pc}]

%
%% DOli macros

%% macros

% título do ato
\newcommand\headline[1]{\begin{center} {\bfseries \MakeUppercase{#1}} \end{center} \par}
% quem assina
\newcommand\byline[2]{\begin{center} {\bfseries \MakeUppercase{#1}} \\%
			{\small\bfseries #2} \\ %
			\rule[3pt]{0.4\hsize}{0.5pt}\\ \end{center} \par}
% separando seções de cada secretaria
\newcommand\closearticle{{\begin{center}\rule[6pt]{\hsize}{1pt}\vspace*{-16pt}
      \rule{\hsize}{0.5pt}\end{center}}}

%% this must be in .tex file
% \titleformat*{\section}[block]{\large\bfseries\filcenter}{\thesection}{1em}{\MakeUppercase}