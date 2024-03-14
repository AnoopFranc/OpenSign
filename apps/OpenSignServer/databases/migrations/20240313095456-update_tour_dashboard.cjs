/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
  // TODO: set className here
  const className = 'w_dashboard';
  const dashboard = new Parse.Query(className);
  const updatedashboard = await dashboard.get('35KBoSgoAK');
  updatedashboard.set('rows', [
    {
      columns: [
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'Card',
            icon: 'fas fa-signature',
            bgColor: '#f0058e',
            label: 'Need your Signature',
            description: null,
            data: {
              id: 'e04ee9dc-932d-6b80-0202-703fd154eb74',
              queryType: '',
              class: 'contracts_Document',
              query:
                'where={"$and":[{"AuditTrail.UserPtr":{"$ne":{"__type":"Pointer","className": "contracts_Users","objectId":"#objectId#"}}},{"AuditTrail.Activity":{"$ne":"Signed"}}],"Signers":{"$in":[{"__type":"Pointer","className":"contracts_Users","objectId":"#objectId#"}]},"IsDeclined":{"$ne":true},"IsCompleted":{"$ne":true},"Type":{"$ne":"Folder"},"Placeholders":{"$ne":null},"ExpiryDate":{"#*gt":{"__type":"#Date#","iso":"#today#"}}}&count=1',
              key: 'count',
              Redirect_type: 'Report',
              Redirect_id: '4Hhwbp482K',
              tourSection: 'tourcard1',
              tourMessage:
                'Clicking on this card will take you to the list of documents awaiting your review.',
            },
          },
        },
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'Card',
            icon: 'fas fa-sign-out-alt',
            bgColor: '#g0058e',
            label: 'Out for signatures',
            description: null,
            data: {
              id: 'c1935cc0-28d4-3d73-b72a-8c1e3d18a17f',
              queryType: '',
              class: 'contracts_Document',
              query:
                'where={"Type":{"#*ne":"Folder"},"Signers":{"#*exists":true,"#*ne":[]},"Placeholders":{"#*ne":null},"IsCompleted":{"#*ne":true},"IsDeclined":{"#*ne":true},"IsArchive":{"#*ne":true},"CreatedBy":{"__type":"Pointer","className":"_User","objectId":"#UserId.objectId#"},"ExpiryDate":{"#*gt":{"__type":"#Date#","iso":"#today#"}}}&count=1',
              key: 'count',
              Redirect_type: 'Report',
              Redirect_id: '1MwEuxLEkF',
              tourSection: 'tourcard2',
              tourMessage:
                'Clicking on this card will take you to a list of documents awaiting signature.',
            },
          },
        },
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'report',
            reportId: '5Go51Q7T8r',
            data: {
              tourSection: 'tourreport1',
              tourMessage: 'This is a list of documents that are waiting for your signature.',
            },
          },
        },
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'report',
            reportId: 'd9k3UfYHBc',
            data: {
              tourSection: 'tourreport2',
              tourMessage:
                "This is a list of documents you've sent to other parties for signature.",
            },
          },
        },
        {
          colxs: '12',
          colmd: '12',
          collg: '12',
          widget: {
            type: 'report',
            reportId: 'kC5mfynCi4',
            data: {
              tourSection: 'tourreport3',
              tourMessage:
                'This are documents you have started but have not finalized for sending.',
            },
          },
        },
      ],
    },
  ]);

  return updatedashboard.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
  const className = 'w_dashboard';
  const dashboard = new Parse.Query(className);
  const revertdashboard = await dashboard.get('35KBoSgoAK');
  revertdashboard.set('rows', [
    {
      columns: [
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'Card',
            icon: 'fas fa-signature',
            bgColor: '#f0058e',
            label: 'Need your Signature',
            description: null,
            data: {
              id: 'e04ee9dc-932d-6b80-0202-703fd154eb74',
              queryType: '',
              class: 'contracts_Document',
              query:
                'where={"$and":[{"AuditTrail.UserPtr":{"$ne":{"__type":"Pointer","className": "contracts_Users","objectId":"#objectId#"}}},{"AuditTrail.Activity":{"$ne":"Signed"}}],"Signers":{"$in":[{"__type":"Pointer","className":"contracts_Users","objectId":"#objectId#"}]},"IsDeclined":{"$ne":true},"IsCompleted":{"$ne":true},"Type":{"$ne":"Folder"},"Placeholders":{"$ne":null},"ExpiryDate":{"#*gt":{"__type":"#Date#","iso":"#today#"}}}&count=1',
              key: 'count',
              Redirect_type: 'Report',
              Redirect_id: '4Hhwbp482K',
              tourSection: 'tourcard1',
              tourMessage:
                'This card shows the aggregate count of documents that are awaiting your signature. Clicking on this card will seamlessly take you to the detailed list of such documents for your review and action.',
            },
          },
        },
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'Card',
            icon: 'fas fa-sign-out-alt',
            bgColor: '#g0058e',
            label: 'Out for signatures',
            description: null,
            data: {
              id: 'c1935cc0-28d4-3d73-b72a-8c1e3d18a17f',
              queryType: '',
              class: 'contracts_Document',
              query:
                'where={"Type":{"#*ne":"Folder"},"Signers":{"#*exists":true,"#*ne":[]},"Placeholders":{"#*ne":null},"IsCompleted":{"#*ne":true},"IsDeclined":{"#*ne":true},"IsArchive":{"#*ne":true},"CreatedBy":{"__type":"Pointer","className":"_User","objectId":"#UserId.objectId#"},"ExpiryDate":{"#*gt":{"__type":"#Date#","iso":"#today#"}}}&count=1',
              key: 'count',
              Redirect_type: 'Report',
              Redirect_id: '1MwEuxLEkF',
              tourSection: 'tourcard2',
              tourMessage:
                "This card indicates the total number of documents you've sent out for signatures. A single click on this card will navigate you to a comprehensive list of these documents, allowing you to monitor their status.",
            },
          },
        },
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'report',
            reportId: '5Go51Q7T8r',
            data: {
              tourSection: 'tourreport1',
              tourMessage:
                'Here lies a curated list of documents that are pending your signature. These are requests from other users that require your immediate attention for completion.',
            },
          },
        },
        {
          colxs: '12',
          colmd: '6',
          collg: '6',
          widget: {
            type: 'report',
            reportId: 'd9k3UfYHBc',
            data: {
              tourSection: 'tourreport2',
              tourMessage:
                "This area displays all the documents you've dispatched for signatures from other parties. It serves as a real-time tracker for documents pending external approval.",
            },
          },
        },
        {
          colxs: '12',
          colmd: '12',
          collg: '12',
          widget: {
            type: 'report',
            reportId: 'kC5mfynCi4',
            data: {
              tourSection: 'tourreport3',
              tourMessage:
                "In this section, you'll find your draft documents awaiting completion. These are the documents you've initiated but haven't yet finalized for sending.",
            },
          },
        },
      ],
    },
  ]);

  return revertdashboard.save();
};
