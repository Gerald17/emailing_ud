// Scenes
import ReceivedEmails from '../components/dashboard/received_emails';
import FailedEmails from '../components/dashboard/failed_emails';
import OpenedEmails from '../components/dashboard/opened_emails';
import SpamEmails from '../components/dashboard/spam_emails';
import QueuedEmails from '../components/dashboard/queued_emails';
import NotFound from '../components/not_found';

export const scenes = [
  {
    id: 2,
    name: 'Recibidos',
    path: '/received',
    component: ReceivedEmails,
    icon: 'tasks',
  },
  {
    id: 3,
    name: 'Fallidos',
    path: '/failed',
    component: FailedEmails,
    icon: 'tasks',
  },
  {
    id: 4,
    name: 'Abiertos',
    path: '/opened',
    component: OpenedEmails,
    icon: 'tasks',
  },
  {
    id: 5,
    name: 'Spam',
    path: '/spam',
    component: SpamEmails,
    icon: 'tasks',
  },
  {
    id: 6,
    name: 'EnCola',
    path: '/queued',
    component: QueuedEmails,
    icon: 'tasks',
  },
  {
    id: 7,
    name: 'NotFound',
    path: '/404',
    component: NotFound,
    icon: 'tasks',    
  }
];