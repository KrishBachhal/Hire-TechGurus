"use strict";

// Importing required libraries and modules
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { css, cx } from '@emotion/css';
import { useThemeUI } from 'theme-ui';
import { useProseMirror } from 'react-prosemirror-adapter';
import { useRecoilState, useRecoilValue } from 'recoil';
import { docState, docIdState, flagsState } from '../recoil/atoms';
import { getDoc, getDocById } from '../api/doc';
import { getSiteByDocId } from '../api/site';
import { getCardsByDocId } from '../api/cards';
import { GlobalCardStyles } from '../components/GlobalCardStyles';
import { SimpleEditor } from '../components/SimpleEditor';
import { DocWorkspace } from '../components/DocWorkspace';
import { GtmScript } from '../components/GtmScript';
import { useCustomCode } from '../hooks/useCustomCode';
import { useSiteFavicon } from '../hooks/useSiteFavicon';

// CSS styles
const containerStyles = css`
  html,
  body {
    min-height: var(--100vh);
    min-height: -webkit-fill-available;
    height: var(--100vh);
    height: -webkit-fill-available;
  }

  body {
    position: relative;
    --100vh: 100vh;
    --editor-width: 100vw;
  }
`;

const DocumentViewer = ({ docId }) => {
  const [doc, setDoc] = useRecoilState(docState);
  const [flags, setFlags] = useRecoilState(flagsState);
  const [customCode, setCustomCode] = useCustomCode();
  const siteFavicon = useSiteFavicon();
  const router = useRouter();
  const { theme } = useThemeUI();
  const proseMirrorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const siteResponse = await getSiteByDocId(docId);
        const docResponse = await getDocById(docId);
        const cardsResponse = await getCardsByDocId(docId);

        setDoc({
          ...docResponse,
          site: siteResponse,
          cards: cardsResponse,
        });
        setFlags(docResponse.flags);
      } catch (error) {
        console.error('Error fetching document data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (docId) {
      fetchData();
    }
  }, [docId]);

  useEffect(() => {
    if (doc && !proseMirrorRef.current) {
      proseMirrorRef.current = useProseMirror({
        schema: doc.schema,
        content: doc.content,
        plugins: [],
      });
    }
  }, [doc]);

  return (
    <div className={cx('document-viewer', containerStyles)}>
      <GlobalCardStyles />
      <GtmScript gtmId={doc.site.gtmContainerId} />
      {siteFavicon && <link rel="icon" href={siteFavicon} />}
      <SimpleEditor
        editor={proseMirrorRef.current}
        dispatch={proseMirrorRef.current?.dispatch}
        editorAnimationsClass={cx('editor-animations', {
          'editor-animations-enabled': flags.siteAnimationsEnabled,
        })}
        editorAnimationsCSSVars={{
          '--editor-background-color': theme.colors.background,
          '--editor-primary-color': theme.colors.primary,
          '--editor-secondary-color': theme.colors.secondary,
          '--editor-accent-color': theme.colors.accent,
        }}
      />
      <DocWorkspace doc={doc} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && customCode?.bodyStart && (
        <div
          className="custom-code-body-start"
          dangerouslySetInnerHTML={{ __html: customCode.bodyStart }}
        />
      )}
    </div>
  );
};

DocumentViewer.propTypes = {
  docId: PropTypes.string.isRequired,
};

export default DocumentViewer;
