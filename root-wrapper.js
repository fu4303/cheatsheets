import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AnchorTag } from './src/components/anchorTag';
import { Code as CodeBlock } from './src/components/code';
import { Code, StyledP } from './src/components/styles';
import { themes } from './src/theme/globalStyle';

const theme = themes['theme1'];

// import { Dump } from './src/utils/helpers';
// components is its own object outside of render so that the references to
// components are stable
const components = {
  pre: ({ children: { props } }) => {
    // if there's a codeString and some props, we passed the test
    if (props.mdxType === 'code') {
      return (
        <CodeBlock
          codeString={props.children.trim()}
          language={
            props.className &&
            props.className.replace('language-', '')
          }
          {...props}
        />
      );
    }
    // it's possible to have a pre without a code in it
    return <pre />;
  },
  a: AnchorTag,
  p: StyledP,
  code: Code,
};

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <MDXProvider components={components}>{element}</MDXProvider>
  </ThemeProvider>
);
