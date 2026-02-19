
import { LegalProject, User, SkillDefinition } from '../types';

const API_Base = '/api';

export class DBService {

  async init(): Promise<void> {
    // Web mode: API is served via proxy, no initialization needed
    return Promise.resolve();
  }

  async saveProject(project: LegalProject): Promise<void> {
    try {
      const response = await fetch(`${API_Base}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      if (!response.ok) throw new Error('Failed to save project');
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getProjects(): Promise<LegalProject[]> {
    try {
      const response = await fetch(`${API_Base}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  }

  async updateUserContext(userId: string, context: any): Promise<void> {
    try {
      const response = await fetch(`${API_Base}/users/update-context`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, context })
      });
      if (!response.ok) throw new Error('Failed to update user context');
    } catch (error) {
      console.error('API Error updating context:', error);
      throw error;
    }
  }

  async saveUser(user: User): Promise<void> {
    await this.updateUserContext(user.id, {
      firmName: user.firmName,
      lawyerName: user.lawyerName,
      areaOfPractice: user.areaOfPractice,
      jurisdiction: user.jurisdiction,
      llmProvider: user.llmProvider,
      llmApiKey: user.llmApiKey
    });
  }

  async registerUser(userData: any): Promise<User> {
    try {
      const response = await fetch(`${API_Base}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Registration failed');
      }
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Registration Error:', error);
      throw error;
    }
  }

  async loginUser(email: string, password?: string): Promise<User> {
    try {
      const response = await fetch(`${API_Base}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        if (!response.ok) throw new Error(`Server Error (${response.status})`);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      return data.user;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return {
      id,
      email: 'demo@lexedgeflow.ai',
      firmName: 'LexEdge Flow Law',
      jurisdiction: 'California',
      lawyerName: 'Demo Lawyer',
      areaOfPractice: 'Corporate'
    }
  }

  async saveSkills(skills: SkillDefinition[]): Promise<void> {
    try {
      const response = await fetch(`${API_Base}/skills/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills })
      });
      if (!response.ok) throw new Error('Failed to save skills');
    } catch (error) {
      console.error('API Error saving skills:', error);
      throw error;
    }
  }

  async getSkills(): Promise<SkillDefinition[]> {
    try {
      const response = await fetch(`${API_Base}/skills`);
      if (!response.ok) throw new Error('Failed to fetch skills');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('API Error fetching skills:', error);
      return [];
    }
  }

  async saveSkill(skill: SkillDefinition): Promise<void> {
    try {
      const response = await fetch(`${API_Base}/skills/${skill.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      });
      if (!response.ok) {
        const createResponse = await fetch(`${API_Base}/skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(skill)
        });
        if (!createResponse.ok) throw new Error('Failed to save skill');
      }
    } catch (error) {
      console.error('API Error saving skill:', error);
      throw error;
    }
  }

  async deleteSkill(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_Base}/skills/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete skill');
    } catch (error) {
      console.error('API Error deleting skill:', error);
      throw error;
    }
  }
}

export const db = new DBService();
