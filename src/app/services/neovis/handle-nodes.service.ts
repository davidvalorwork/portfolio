import { Inject } from '@angular/core';
import { IPerson } from '../../portfolio/models/IPerson';
import { VisNode } from 'vis-network/declarations/network/gephiParser';
import { IMiniPerson } from '../../portfolio/models/IMiniPerson';

@Inject({
  provideIn: 'root'
})
export class HandleNodesService {
  constructor() { }

  handleFacebookNodes(p: (IPerson | IMiniPerson)[]): VisNode[] {
    return p.map((np: IPerson | IMiniPerson) => {
      return {
        id: np.id,
        fixed: false,
        label: np.name,
        title: np.name,
        group: np.name,
        image: np.profile_picture,
        shape: 'image',
        attributes: np
      }
    })
  }
}