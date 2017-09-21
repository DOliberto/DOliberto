% https://www.sharelatex.com/learn/Writing_your_own_class
% https://www.sharelatex.com/learn/Multiple_columns
% https://www.sharelatex.com/learn/Commands
% https://www.sharelatex.com/learn/Environments

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{doliberto}[2017/09/21 Mesquita's D.O. class]

\LoadClass[twocolumn, a4paper]{article}

\RequirePackage{polyglossia}
\RequirePackage{graphicx}
\RequirePackage{fancyhdr}

\DeclareOption{onecolumn}{\OptionNotUsed}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax

\setmainlanguage{portuges}
\setlength{\columnseprule}{0.4pt}

\renewcommand{\normalsize}{\fontsize{9}{10}\selectfont}
\setcounter{secnumdepth}{0}