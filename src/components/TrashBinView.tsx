import React, { PropsWithChildren } from 'react';
import fs from 'fs-extra';
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardActivity,
  Panel,
  PrimaryButton,
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
                activity={`Deleted at ${intl.formatDate(data.time)}`}
                people={[{ name: os.userInfo().username, profileImageSrc: '' }]}
              />
            </DocumentCardDetails>
          </DocumentCard>
        </div>
      );
    });
  });
  return (
    <Panel
      isLightDismiss
      isOpen={show}
      onDismiss={onDismiss}
      headerText="Trash Bin"
      onRenderFooter={(): JSX.Element => {
        return <PrimaryButton onClick={onDismiss}>Empty trash bin</PrimaryButton>;
      }}
      isFooterAtBottom
    >
      {trashDocs}
    </Panel>
  );
});
