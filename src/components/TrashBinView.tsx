import React, { PropsWithChildren, useCallback } from 'react';
import fs from 'fs-extra';
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardActivity,
  Panel,
  PrimaryButton,
  DefaultButton,
} from '@fluentui/react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import os from 'os';
import path from 'path';

export interface TrashBinViewProps extends PropsWithChildren<WrappedComponentProps> {
  show: boolean;
  onDismiss: () => void;
}

export default injectIntl(function TrashBinView(props: TrashBinViewProps): JSX.Element {
  const { intl, show, onDismiss } = props;
  const trashDocs: JSX.Element[] = [];
  fs.readdirSync('./TRASH_BIN').forEach((filename, index) => {
    fs.readJson(path.join('./TRASH_BIN/', filename)).then((data) => {
      trashDocs.push(
        <div style={{ padding: '5px 0' }} key={index}>
          <DocumentCard
            onClick={() => {
              /* SEND BACK THIS FILE */
            }}
          >
            <DocumentCardDetails>
              <DocumentCardTitle title={data.title} shouldTruncate />
              <DocumentCardActivity
                activity={intl.formatMessage(
                  { id: 'dialog.trash.deleted' },
                  { time: intl.formatDate(data.time) }
                )}
                people={[{ name: os.userInfo().username, profileImageSrc: '' }]}
              />
            </DocumentCardDetails>
          </DocumentCard>
        </div>
      );
    });
  });
  if (trashDocs.length === 0) {
    trashDocs.push(
      <div
        style={{ boxSizing: 'border-box', width: '100%', textAlign: 'center', marginTop: 50 }}
        key="TrashBinNoAnyFile"
      >
        Your trash bin is very clear :)
      </div>
    );
  }
  return (
    <Panel
      isLightDismiss
      isOpen={show}
      onDismiss={onDismiss}
      headerText={intl.formatMessage({ id: 'dialog.trash.title' })}
      onRenderFooter={useCallback((): JSX.Element => {
        return (
          <div style={{ padding: 5 }}>
            <PrimaryButton
              styles={{ root: { marginRight: 5 } }}
              onClick={() => {
                fs.emptyDirSync('./TRASH_BIN');
                onDismiss();
              }}
            >
              Delete all items
            </PrimaryButton>
            <DefaultButton onClick={onDismiss}>Cancel</DefaultButton>
          </div>
        );
      }, [onDismiss])}
      isFooterAtBottom
    >
      {trashDocs}
    </Panel>
  );
});
