import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Flex,
  Box,
  Spacer,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { ReportAbuse } from '../../components/ReportAbuse';
import { MadeWithGamma } from '../../components/MadeWithGamma';
import { useHandleCardHash } from '../../hooks/useHandleCardHash';
import { useDocumentWorkspace } from '../../hooks/useDocumentWorkspace';
import { reportAbuse } from '../../store/actions/abuseActions';
import { selectAbuseReports } from '../../store/selectors/abuseSelectors';

const propTypes = {
  docWorkspace: PropTypes.object.isRequired,
  forceShow: PropTypes.bool,
  abuseReportingEnabled: PropTypes.bool,
};

export const DocumentFooter = ({ docWorkspace, forceShow, abuseReportingEnabled }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const abuseReports = useSelector(selectAbuseReports);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportId, setReportId] = useState(null);
  const { cardId } = useHandleCardHash();
  const { isDark } = useColorModeValue();
  const { editor } = useDocumentWorkspace();

  useEffect(() => {
    if (!editor) return;

    const handleURLChange = (payload) => {
      const { cardId } = payload;
      if (cardId) {
        setReportId(abuseReports.includes(cardId) ? cardId : null);
      }
    };

    r.fI.on('changed', handleURLChange);

    return () => {
      r.fI.off('changed', handleURLChange);
    };
  }, [abuseReports, editor]);

  useEffect(() => {
    if (!editor || !cardId) return;

    const { fromPos, fromPct } = location.state || {};
    if (fromPos && 'pop' === location.method) {
      editor.chain().scrollToPositionInCard(fromPos, fromPct || undefined).run();
    } else {
      const card = docWorkspace.cards.find((c) => c.id === cardId);
      if (card) {
        s.YS({ cardId, editor });
      }
    }
  }, [cardId, docWorkspace, editor, location.method, location.state]);

  const handleReportAbuse = () => {
    if (!editor || !cardId) return;

    dispatch(reportAbuse(cardId, reason, description));
    onClose();
  };

  return (
    <Flex
      position={forceShow ? 'fixed' : 'relative'}
      bottom={forceShow ? [1, 4] : undefined}
      right={forceShow ? [1, 6] : undefined}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      maxWidth="1200px"
      mx="auto"
      px={6}
      py={4}
      bg={useColorModeValue('white', 'gray.800')}
      borderTopWidth="1px"
      borderTopColor="gray.200"
      display={forceShow || editor ? 'flex' : 'none'}
    >
      <Spacer />
      <Box>
        <ReportAbuse
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          reportId={reportId}
          setSelectedReport={setSelectedReport}
          setReason={setReason}
          setDescription={setDescription}
          handleReportAbuse={handleReportAbuse}
          abuseReportingEnabled={abuseReportingEnabled}
        />
      </Box>
      <MadeWithGamma isDark={isDark} />
    </Flex>
  );
};

DocumentFooter.propTypes = propTypes;
