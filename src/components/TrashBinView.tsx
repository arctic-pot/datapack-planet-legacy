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
  IStyleFunctionOrObject,
  IDocumentCardTitleStyleProps,
  IDocumentCardTitleStyles,
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
  const heightAuto: IStyleFunctionOrObject<
    IDocumentCardTitleStyleProps,
    IDocumentCardTitleStyles
  > = {
    root: {
      height: 'auto',
    },
  };
  fs.readdirSync('./TRASH_BIN').forEach((filename, index) => {
    const data = fs.readJsonSync(path.join('./TRASH_BIN/', filename));
    trashDocs.push(
      <div style={{ padding: '5px 0' }} key={index}>
        <DocumentCard
          onClick={() => {
            /* SEND BACK THIS FILE */
          }}
        >
          <DocumentCardDetails>
            <DocumentCardTitle title={data.title} shouldTruncate />
            <DocumentCardTitle
              title={
                data.workspace === sessionStorage.getItem('dir')
                  ? intl.formatMessage({ id: 'dialog.trash.current' })
                  : intl.formatMessage(
                      { id: 'dialog.trash.workspace' },
                      { workspace: data.workspace }
                    )
              }
              showAsSecondaryTitle
              styles={heightAuto}
            />
            <DocumentCardTitle
              title={intl.formatMessage({ id: 'dialog.trash.type' }, { type: data.type })}
              showAsSecondaryTitle
              styles={heightAuto}
            />
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
          <div style={{ padding: 10 }}>
            <PrimaryButton
              styles={{ root: { marginRight: 10 } }}
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
